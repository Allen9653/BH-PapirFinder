-- Automatsko trajno brisanje privremenih dokumenata 5 sati nakon kreiranja.
-- Pokrenuti JEDNOM u Supabase SQL Editoru. Ne briše ništa mlađe od 5 sati.
-- PREDUSLOV: service_role ključ u Vaultu (Dashboard -> Project Settings -> API -> service_role):
--   select vault.create_secret('<SERVICE_ROLE_KEY>', 'service_role_key');
-- Ključ ostaje samo u bazi; nikad ga ne stavljajte u frontend.

-- PREDUSLOV 2: uključite ekstenziju pg_net u Dashboard -> Database -> Extensions (pg_cron je već aktivan).

-- Metapodaci za privremene dokumente iz Edge funkcije handle-temp-doc (samo service role).
create table if not exists public.temp_doc_sessions (
  id bigserial primary key,
  token_hash text not null unique,
  storage_path text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
alter table public.temp_doc_sessions enable row level security;
revoke all on public.temp_doc_sessions from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('temp_documents', 'temp_documents', false, 5242880, array['application/pdf'])
on conflict (id) do nothing;

create or replace function public.purge_expired_documents(max_age interval default interval '5 hours')
returns integer
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  svc text;
  r record;
  n integer := 0;
begin
  delete from public.user_document_logs where created_at < now() - max_age;
  delete from public.temp_doc_sessions where created_at < now() - max_age;

  select decrypted_secret into svc from vault.decrypted_secrets where name = 'service_role_key';
  if svc is null then
    raise warning 'Vault secret service_role_key nedostaje: Storage fajlovi nisu obrisani';
    return 0;
  end if;

  -- Brisanje preko Storage API-ja (briše i metapodatke i sam fajl).
  for r in
    select bucket_id, name from storage.objects
    where ((bucket_id = 'papirfinder-docs' and name like 'generated/%') or bucket_id = 'temp_documents')
      and created_at < now() - max_age
    limit 1000
  loop
    perform net.http_delete(
      url := 'https://zdvqjjmpxifbltihffas.supabase.co/storage/v1/object/' || r.bucket_id || '/' || r.name,
      headers := jsonb_build_object('Authorization', 'Bearer ' || svc, 'apikey', svc)
    );
    n := n + 1;
  end loop;
  return n;
end;
$$;

revoke all on function public.purge_expired_documents(interval) from public, anon, authenticated;

select cron.unschedule('purge-expired-documents-5h')
where exists (select 1 from cron.job where jobname = 'purge-expired-documents-5h');
select cron.schedule('purge-expired-documents-5h', '*/5 * * * *', $$select public.purge_expired_documents();$$);

-- Provjera: select * from cron.job_run_details where jobid = (select jobid from cron.job where jobname='purge-expired-documents-5h') order by start_time desc limit 5;
