# AI Chatbot & PDF Form Filler — BH PapirFinder

## Design
- Chat bubble UI with user (right, blue) and bot (left, gray) messages
- Floating chat button on bottom-right corner
- Language selector integrated in chat header
- PDF generation progress indicator

## Development Tasks
- [x] Create chatbot-service.ts — Conversation logic with AI_DIALOG_KEYS flow
- [x] Create pdf-form-filler.ts — PDF filling service using pdf-lib
- [x] Create pdf-storage.ts — Supabase Storage upload with signed URL
- [x] Create AIChatbot.tsx — React component with bubble UI
- [x] Floating chat button integrated directly in AIChatbot component
- [x] Update App.tsx — Add chatbot floating button on all pages