-- ============================================================
-- BH PapirFinder — Database Migration: User Profiles & Auth Support
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This fixes the "Database error saving new user" issue
-- ============================================================

-- 1. Create user_profiles table (referenced by access-control.ts and payment.ts)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name VARCHAR(255),
    subscription_status VARCHAR(50) DEFAULT 'trial',  -- 'trial', 'paid', 'expired'
    subscription_plan VARCHAR(50),                     -- 'plan5days', 'plan30days', 'plan12months'
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create transactions table (referenced by payment.ts)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    order_id VARCHAR(255),
    plan_id VARCHAR(50),
    amount DECIMAL(10, 2),
    currency VARCHAR(10),
    email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create registration_logs table (referenced by ip-registration.ts)
CREATE TABLE IF NOT EXISTS registration_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    country VARCHAR(10),
    city VARCHAR(100),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Create broken_link_reports table (referenced by broken-link-service.ts)
CREATE TABLE IF NOT EXISTS broken_link_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    municipality_name VARCHAR(255),
    municipality_slug VARCHAR(100),
    form_name VARCHAR(255),
    form_id VARCHAR(100),
    broken_url TEXT,
    reported_by VARCHAR(255),
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Create notification_preferences table (referenced by notification-preferences.ts)
CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email VARCHAR(255),
    report_status_changed BOOLEAN DEFAULT true,
    report_resolved BOOLEAN DEFAULT true,
    weekly_digest BOOLEAN DEFAULT false,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT false,
    in_app_notifications BOOLEAN DEFAULT true,
    notification_frequency VARCHAR(20) DEFAULT 'instant',
    notification_language VARCHAR(10) DEFAULT 'bs',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================
-- Trigger: Auto-create user_profiles on new user signup
-- THIS IS THE KEY FIX for "Database error saving new user"
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, full_name, subscription_status, subscription_expires_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        'trial',
        NOW() + INTERVAL '10 days'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists (to avoid conflicts)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE broken_link_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- user_profiles: Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow the trigger function to insert (runs as SECURITY DEFINER)
CREATE POLICY "Service role can insert profiles" ON user_profiles
    FOR INSERT WITH CHECK (true);

-- transactions: Users can read their own transactions
CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated can insert transactions" ON transactions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- registration_logs: Public insert (for anonymous registration tracking)
CREATE POLICY "Public insert registration_logs" ON registration_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read registration_logs" ON registration_logs
    FOR SELECT USING (true);

-- broken_link_reports: Public read/insert
CREATE POLICY "Public insert broken_link_reports" ON broken_link_reports
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read broken_link_reports" ON broken_link_reports
    FOR SELECT USING (true);

CREATE POLICY "Auth update broken_link_reports" ON broken_link_reports
    FOR UPDATE USING (auth.role() = 'authenticated');

-- notification_preferences: Users manage their own
CREATE POLICY "Users can view own prefs" ON notification_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own prefs" ON notification_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prefs" ON notification_preferences
    FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_registration_logs_ip ON registration_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_registration_logs_email ON registration_logs(email);
CREATE INDEX IF NOT EXISTS idx_broken_link_reports_status ON broken_link_reports(status);