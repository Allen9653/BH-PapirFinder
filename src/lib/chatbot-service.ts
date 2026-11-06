import { getLocalizedString, AI_DIALOG_KEYS } from './translation-cache';

// ============================================================
// Chatbot Service — Conversation Flow for Form Filling
// ============================================================

export type MessageRole = 'user' | 'bot' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'text' | 'pdf_link' | 'loading' | 'error';
    pdfUrl?: string;
    expiresAt?: Date;
  };
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  fatherName?: string;
  address?: string;
  jmbg?: string;
  email?: string;
  phone?: string;
}

export type ConversationStep =
  | 'idle'
  | 'greeting'
  | 'ask_form'
  | 'confirm_fill'
  | 'ask_father_name'
  | 'ask_address'
  | 'ask_purpose'
  | 'ask_jmbg'
  | 'generating_pdf'
  | 'pdf_ready'
  | 'error';

export interface ConversationState {
  step: ConversationStep;
  collectedData: UserProfile & { purpose?: string; formName?: string; institution?: string };
  missingFields: string[];
  language: string;
}

/**
 * Initialize a new conversation state
 */
export function createConversationState(lang: string): ConversationState {
  return {
    step: 'idle',
    collectedData: {},
    missingFields: [],
    language: lang,
  };
}

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get the greeting message for the chatbot
 */
export async function getGreetingMessage(lang: string): Promise<string> {
  const greeting = await getLocalizedString(AI_DIALOG_KEYS.greeting, lang);
  if (greeting === AI_DIALOG_KEYS.greeting) {
    // Fallback if not in DB
    const fallbacks: Record<string, string> = {
      bs: 'Zdravo! Ja sam vaš AI asistent za popunjavanje obrazaca. Kako vam mogu pomoći?',
      en: 'Hello! I am your AI assistant for filling out forms. How can I help you?',
      de: 'Hallo! Ich bin Ihr KI-Assistent zum Ausfüllen von Formularen. Wie kann ich Ihnen helfen?',
      tr: 'Merhaba! Form doldurma konusunda yapay zeka asistanınızım. Size nasıl yardımcı olabilirim?',
      'bs-Cyrl': 'Здраво! Ја сам ваш АИ асистент за попуњавање образаца. Како вам могу помоћи?',
    };
    return fallbacks[lang] || fallbacks['bs'];
  }
  return greeting;
}

/**
 * Determine which fields are missing from the user profile
 */
export function getMissingFields(profile: UserProfile): string[] {
  const required: (keyof UserProfile)[] = ['firstName', 'lastName', 'jmbg', 'address'];
  const missing: string[] = [];

  for (const field of required) {
    if (!profile[field] || profile[field]!.trim() === '') {
      missing.push(field);
    }
  }

  return missing;
}

/**
 * Get the next question to ask based on missing fields
 */
export async function getNextQuestion(
  state: ConversationState
): Promise<{ question: string; nextStep: ConversationStep } | null> {
  const { missingFields, language } = state;

  if (missingFields.length === 0) return null;

  const nextField = missingFields[0];
  let key: string;
  let nextStep: ConversationStep;

  switch (nextField) {
    case 'fatherName':
      key = AI_DIALOG_KEYS.askFatherName;
      nextStep = 'ask_father_name';
      break;
    case 'address':
      key = AI_DIALOG_KEYS.askAddress;
      nextStep = 'ask_address';
      break;
    case 'jmbg':
      key = AI_DIALOG_KEYS.askJMBG;
      nextStep = 'ask_jmbg';
      break;
    default:
      key = AI_DIALOG_KEYS.askMissingField;
      nextStep = 'ask_father_name';
      break;
  }

  let question = await getLocalizedString(key, language);

  // Fallback questions
  if (question === key) {
    const fallbacks: Record<string, Record<string, string>> = {
      fatherName: {
        bs: 'Molimo unesite ime vašeg oca:',
        en: 'Please enter your father\'s name:',
        tr: 'Lütfen babanızın adını girin:',
        de: 'Bitte geben Sie den Namen Ihres Vaters ein:',
        'bs-Cyrl': 'Молимо унесите име вашег оца:',
      },
      address: {
        bs: 'Molimo unesite vašu adresu prebivališta:',
        en: 'Please enter your residential address:',
        tr: 'Lütfen ikamet adresinizi girin:',
        de: 'Bitte geben Sie Ihre Wohnadresse ein:',
        'bs-Cyrl': 'Молимо унесите вашу адресу пребивалишта:',
      },
      jmbg: {
        bs: 'Molimo unesite vaš JMBG (13 cifara):',
        en: 'Please enter your JMBG (13 digits):',
        tr: 'Lütfen JMBG numaranızı girin (13 hane):',
        de: 'Bitte geben Sie Ihre JMBG ein (13 Ziffern):',
        'bs-Cyrl': 'Молимо унесите ваш ЈМБГ (13 цифара):',
      },
    };
    question = fallbacks[nextField]?.[language] || fallbacks[nextField]?.['bs'] || `Molimo unesite ${nextField}:`;
  }

  return { question, nextStep };
}

/**
 * Process user input and advance the conversation
 */
export async function processUserInput(
  input: string,
  state: ConversationState
): Promise<{ response: string; newState: ConversationState; action?: 'generate_pdf' }> {
  const { step, language } = state;
  const trimmedInput = input.trim();

  switch (step) {
    case 'idle':
    case 'greeting': {
      // User initiated conversation — check if they mention a form
      const newState: ConversationState = {
        ...state,
        step: 'confirm_fill',
        collectedData: { ...state.collectedData, formName: trimmedInput },
      };

      let response = await getLocalizedString(AI_DIALOG_KEYS.askToFill, language);
      if (response === AI_DIALOG_KEYS.askToFill) {
        const fallbacks: Record<string, string> = {
          bs: `Razumijem, trebate pomoć sa obrascem. Želite li da ga popunim za vas?`,
          en: `I understand, you need help with a form. Would you like me to fill it out for you?`,
          tr: `Anlıyorum, bir formla ilgili yardıma ihtiyacınız var. Sizin için doldurmamı ister misiniz?`,
          de: `Ich verstehe, Sie brauchen Hilfe mit einem Formular. Soll ich es für Sie ausfüllen?`,
          'bs-Cyrl': `Разумијем, требате помоћ са обрасцем. Желите ли да га попуним за вас?`,
        };
        response = fallbacks[language] || fallbacks['bs'];
      }

      return { response, newState };
    }

    case 'confirm_fill': {
      const positiveResponses = ['da', 'yes', 'evet', 'ja', 'да', 'ok', 'okay', 'naravno', 'molim'];
      const isPositive = positiveResponses.some(r => trimmedInput.toLowerCase().includes(r));

      if (isPositive) {
        // Check what data we already have and what's missing
        const missing = getMissingFields(state.collectedData);
        const newState: ConversationState = { ...state, missingFields: missing };

        if (missing.length === 0) {
          // All data available, generate PDF
          newState.step = 'generating_pdf';
          let response = await getLocalizedString(AI_DIALOG_KEYS.haveProfileData, language);
          if (response === AI_DIALOG_KEYS.haveProfileData) {
            response = 'Imam sve potrebne podatke. Generiram PDF...';
          }
          return { response, newState, action: 'generate_pdf' };
        }

        // Ask for missing data
        const nextQ = await getNextQuestion(newState);
        if (nextQ) {
          newState.step = nextQ.nextStep;
          newState.missingFields = missing;

          let prefix = await getLocalizedString(AI_DIALOG_KEYS.haveProfileData, language);
          if (prefix === AI_DIALOG_KEYS.haveProfileData) {
            prefix = '';
          }

          const response = prefix ? `${prefix} ${nextQ.question}` : nextQ.question;
          return { response, newState };
        }

        newState.step = 'generating_pdf';
        return { response: 'Generiram PDF...', newState, action: 'generate_pdf' };
      } else {
        // User said no or something else
        const newState: ConversationState = { ...state, step: 'idle' };
        const fallbacks: Record<string, string> = {
          bs: 'U redu. Kako vam još mogu pomoći?',
          en: 'Alright. How else can I help you?',
          tr: 'Tamam. Size başka nasıl yardımcı olabilirim?',
          de: 'In Ordnung. Wie kann ich Ihnen sonst helfen?',
          'bs-Cyrl': 'У реду. Како вам још могу помоћи?',
        };
        return { response: fallbacks[language] || fallbacks['bs'], newState };
      }
    }

    case 'ask_father_name': {
      const newState: ConversationState = {
        ...state,
        collectedData: { ...state.collectedData, fatherName: trimmedInput },
        missingFields: state.missingFields.filter(f => f !== 'fatherName'),
      };

      // Check if more fields needed
      const nextQ = await getNextQuestion(newState);
      if (nextQ) {
        newState.step = nextQ.nextStep;
        return { response: nextQ.question, newState };
      }

      newState.step = 'generating_pdf';
      return { response: 'Hvala! Generiram vaš PDF...', newState, action: 'generate_pdf' };
    }

    case 'ask_address': {
      const newState: ConversationState = {
        ...state,
        collectedData: { ...state.collectedData, address: trimmedInput },
        missingFields: state.missingFields.filter(f => f !== 'address'),
      };

      const nextQ = await getNextQuestion(newState);
      if (nextQ) {
        newState.step = nextQ.nextStep;
        return { response: nextQ.question, newState };
      }

      newState.step = 'generating_pdf';
      return { response: 'Hvala! Generiram vaš PDF...', newState, action: 'generate_pdf' };
    }

    case 'ask_jmbg': {
      // Validate JMBG (13 digits)
      const jmbgClean = trimmedInput.replace(/\s/g, '');
      if (!/^\d{13}$/.test(jmbgClean)) {
        const errorMsgs: Record<string, string> = {
          bs: 'JMBG mora imati tačno 13 cifara. Molimo pokušajte ponovo:',
          en: 'JMBG must be exactly 13 digits. Please try again:',
          tr: 'JMBG tam olarak 13 haneli olmalıdır. Lütfen tekrar deneyin:',
          de: 'JMBG muss genau 13 Ziffern haben. Bitte versuchen Sie es erneut:',
          'bs-Cyrl': 'ЈМБГ мора имати тачно 13 цифара. Молимо покушајте поново:',
        };
        return { response: errorMsgs[language] || errorMsgs['bs'], newState: state };
      }

      const newState: ConversationState = {
        ...state,
        collectedData: { ...state.collectedData, jmbg: jmbgClean },
        missingFields: state.missingFields.filter(f => f !== 'jmbg'),
      };

      const nextQ = await getNextQuestion(newState);
      if (nextQ) {
        newState.step = nextQ.nextStep;
        return { response: nextQ.question, newState };
      }

      newState.step = 'generating_pdf';
      return { response: 'Hvala! Generiram vaš PDF...', newState, action: 'generate_pdf' };
    }

    case 'ask_purpose': {
      const newState: ConversationState = {
        ...state,
        collectedData: { ...state.collectedData, purpose: trimmedInput },
        step: 'generating_pdf',
      };
      return { response: 'Hvala! Generiram vaš PDF...', newState, action: 'generate_pdf' };
    }

    default: {
      // Generic response for unhandled states
      const fallbacks: Record<string, string> = {
        bs: 'Kako vam mogu pomoći? Recite mi koji obrazac trebate popuniti.',
        en: 'How can I help you? Tell me which form you need to fill out.',
        tr: 'Size nasıl yardımcı olabilirim? Hangi formu doldurmanız gerektiğini söyleyin.',
        de: 'Wie kann ich Ihnen helfen? Sagen Sie mir, welches Formular Sie ausfüllen müssen.',
        'bs-Cyrl': 'Како вам могу помоћи? Реците ми који образац требате попунити.',
      };
      const newState: ConversationState = { ...state, step: 'greeting' };
      return { response: fallbacks[language] || fallbacks['bs'], newState };
    }
  }
}