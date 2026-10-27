import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, Send, X, Download, Globe, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';
import {
  ChatMessage,
  ConversationState,
  createConversationState,
  generateMessageId,
  getGreetingMessage,
  processUserInput,
} from '@/lib/chatbot-service';
import { fillPdfForm, FormData, detectFormType } from '@/lib/pdf-form-filler';
import { uploadPdfAndGetSignedUrl, triggerPdfDownload, formatExpiryTime } from '@/lib/pdf-storage';

const AIChatbot: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>(
    createConversationState(language)
  );
  const [showLangMenu, setShowLangMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Update conversation state language when language changes
  useEffect(() => {
    setConversationState(prev => ({ ...prev, language }));
  }, [language]);

  // Send greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendGreeting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendGreeting = async () => {
    setIsTyping(true);
    try {
      const greeting = await getGreetingMessage(language);
      const botMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'bot',
        content: greeting,
        timestamp: new Date(),
      };
      setMessages([botMessage]);
      setConversationState(prev => ({ ...prev, step: 'greeting' }));
    } catch (err) {
      console.error('Greeting error:', err);
      const fallbackMsg: ChatMessage = {
        id: generateMessageId(),
        role: 'bot',
        content: 'Zdravo! Ja sam vaš AI asistent za popunjavanje obrazaca. Kako vam mogu pomoći?',
        timestamp: new Date(),
      };
      setMessages([fallbackMsg]);
      setConversationState(prev => ({ ...prev, step: 'greeting' }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const { response, newState, action } = await processUserInput(text, conversationState);

      // Add bot response
      const botMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'bot',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setConversationState(newState);

      // If action is to generate PDF
      if (action === 'generate_pdf') {
        await handlePdfGeneration(newState);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'bot',
        content: getErrorMessage(language),
        timestamp: new Date(),
        metadata: { type: 'error' },
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePdfGeneration = async (state: ConversationState) => {
    // Show loading message
    const loadingMsg: ChatMessage = {
      id: generateMessageId(),
      role: 'bot',
      content: getGeneratingMessage(language),
      timestamp: new Date(),
      metadata: { type: 'loading' },
    };
    setMessages(prev => [...prev, loadingMsg]);

    try {
      // Prepare form data
      const formData: FormData = {
        firstName: state.collectedData.firstName,
        lastName: state.collectedData.lastName,
        fatherName: state.collectedData.fatherName,
        address: state.collectedData.address,
        jmbg: state.collectedData.jmbg,
        purpose: state.collectedData.purpose,
        municipality: state.collectedData.institution,
      };

      // Detect form type from conversation
      const formType = detectFormType(state.collectedData.formName || '');

      // Generate PDF
      const pdfBytes = await fillPdfForm(formData, formType);

      // Upload and get signed URL
      const fileName = `${formType}_${Date.now()}.pdf`;
      const result = await uploadPdfAndGetSignedUrl(pdfBytes, fileName);

      // Remove loading message
      setMessages(prev => prev.filter(m => m.id !== loadingMsg.id));

      if ('error' in result) {
        const errorMsg: ChatMessage = {
          id: generateMessageId(),
          role: 'bot',
          content: result.error,
          timestamp: new Date(),
          metadata: { type: 'error' },
        };
        setMessages(prev => [...prev, errorMsg]);
      } else {
        // Success — show download link
        const successMsg: ChatMessage = {
          id: generateMessageId(),
          role: 'bot',
          content: getPdfReadyMessage(language),
          timestamp: new Date(),
          metadata: {
            type: 'pdf_link',
            pdfUrl: result.url,
            expiresAt: result.expiresAt,
          },
        };
        setMessages(prev => [...prev, successMsg]);

        // Update state
        setConversationState(prev => ({ ...prev, step: 'pdf_ready' }));
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      setMessages(prev => prev.filter(m => m.id !== loadingMsg.id));
      const errorMsg: ChatMessage = {
        id: generateMessageId(),
        role: 'bot',
        content: getErrorMessage(language),
        timestamp: new Date(),
        metadata: { type: 'error' },
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setConversationState(prev => ({ ...prev, language: newLang }));
    setShowLangMenu(false);
  };

  const handleDownload = (url: string) => {
    triggerPdfDownload(url, `obrazac_${Date.now()}.pdf`);
  };

  const resetChat = () => {
    setMessages([]);
    setConversationState(createConversationState(language));
    setTimeout(() => sendGreeting(), 100);
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="no-print floating-chatbot fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
        style={{ zIndex: 99999 }}
        aria-label="Open AI Assistant"
        title="AI Asistent"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className="no-print floating-chatbot fixed bottom-6 right-6 w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
      style={{ zIndex: 99999 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">BH PapirFinder AI</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              className="p-1.5 hover:bg-blue-500 rounded transition-colors"
              title="Change language"
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              <Globe className="w-4 h-4" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border py-1 min-w-[130px]" style={{ zIndex: 100000 }}>
                {(['bs', 'en', 'de', 'tr', 'bs-Cyrl'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors ${
                      language === lang ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {getLangLabel(lang)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-blue-500 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : msg.metadata?.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-md'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>

              {/* PDF Download Button */}
              {msg.metadata?.type === 'pdf_link' && msg.metadata.pdfUrl && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => handleDownload(msg.metadata!.pdfUrl!)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors w-full justify-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {getDownloadLabel(language)}
                  </button>
                  {msg.metadata.expiresAt && (
                    <p className="text-[10px] text-gray-400 mt-1 text-center">
                      {formatExpiryTime(msg.metadata.expiresAt, language)}
                    </p>
                  )}
                </div>
              )}

              {/* Loading indicator */}
              {msg.metadata?.type === 'loading' && (
                <div className="flex items-center gap-2 mt-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                  <span className="text-xs text-gray-500">PDF...</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 px-3 py-3 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={getInputPlaceholder(language)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2.5 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
          <button
            onClick={resetChat}
            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            {getResetLabel(language)}
          </button>
          <span className="text-[10px] text-gray-300">BH PapirFinder AI</span>
        </div>
      </div>
    </div>
  );
};

// Helper functions for UI labels
function getLangLabel(lang: Language): string {
  const labels: Record<Language, string> = {
    bs: '🇧🇦 Bosanski',
    en: '🇬🇧 English',
    de: '🇩🇪 Deutsch',
    tr: '🇹🇷 Türkçe',
    'bs-Cyrl': '🇷🇸 Српски',
  };
  return labels[lang];
}

function getInputPlaceholder(lang: string): string {
  const placeholders: Record<string, string> = {
    bs: 'Unesite poruku...',
    en: 'Type a message...',
    de: 'Nachricht eingeben...',
    tr: 'Bir mesaj yazın...',
    'bs-Cyrl': 'Унесите поруку...',
  };
  return placeholders[lang] || placeholders['bs'];
}

function getDownloadLabel(lang: string): string {
  const labels: Record<string, string> = {
    bs: 'Preuzmi PDF',
    en: 'Download PDF',
    de: 'PDF herunterladen',
    tr: 'PDF İndir',
    'bs-Cyrl': 'Преузми ПДФ',
  };
  return labels[lang] || labels['bs'];
}

function getResetLabel(lang: string): string {
  const labels: Record<string, string> = {
    bs: 'Nova konverzacija',
    en: 'New conversation',
    de: 'Neues Gespräch',
    tr: 'Yeni konuşma',
    'bs-Cyrl': 'Нова конверзација',
  };
  return labels[lang] || labels['bs'];
}

function getErrorMessage(lang: string): string {
  const messages: Record<string, string> = {
    bs: 'Došlo je do greške. Molimo pokušajte ponovo.',
    en: 'An error occurred. Please try again.',
    de: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    tr: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    'bs-Cyrl': 'Дошло је до грешке. Молимо покушајте поново.',
  };
  return messages[lang] || messages['bs'];
}

function getGeneratingMessage(lang: string): string {
  const messages: Record<string, string> = {
    bs: 'Generiram vaš PDF dokument...',
    en: 'Generating your PDF document...',
    de: 'Ihr PDF-Dokument wird erstellt...',
    tr: 'PDF belgeniz oluşturuluyor...',
    'bs-Cyrl': 'Генеришем ваш ПДФ документ...',
  };
  return messages[lang] || messages['bs'];
}

function getPdfReadyMessage(lang: string): string {
  const messages: Record<string, string> = {
    bs: '✅ Vaš PDF je spreman! Kliknite dugme ispod za preuzimanje.',
    en: '✅ Your PDF is ready! Click the button below to download.',
    de: '✅ Ihr PDF ist fertig! Klicken Sie auf die Schaltfläche unten zum Herunterladen.',
    tr: '✅ PDF\'iniz hazır! İndirmek için aşağıdaki düğmeye tıklayın.',
    'bs-Cyrl': '✅ Ваш ПДФ је спреман! Кликните дугме испод за преузимање.',
  };
  return messages[lang] || messages['bs'];
}

export default AIChatbot;