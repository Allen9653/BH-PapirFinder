// Transliteration module for Cyrillic ↔ Latin conversion
// Supports Bosnian/Serbian/Croatian alphabet

const cyrillicToLatin: Record<string, string> = {
  'А': 'A', 'а': 'a',
  'Б': 'B', 'б': 'b',
  'В': 'V', 'в': 'v',
  'Г': 'G', 'г': 'g',
  'Д': 'D', 'д': 'd',
  'Ђ': 'Đ', 'ђ': 'đ',
  'Е': 'E', 'е': 'e',
  'Ж': 'Ž', 'ж': 'ž',
  'З': 'Z', 'з': 'z',
  'И': 'I', 'и': 'i',
  'Ј': 'J', 'ј': 'j',
  'К': 'K', 'к': 'k',
  'Л': 'L', 'л': 'l',
  'Љ': 'Lj', 'љ': 'lj',
  'М': 'M', 'м': 'm',
  'Н': 'N', 'н': 'n',
  'Њ': 'Nj', 'њ': 'nj',
  'О': 'O', 'о': 'o',
  'П': 'P', 'п': 'p',
  'Р': 'R', 'р': 'r',
  'С': 'S', 'с': 's',
  'Т': 'T', 'т': 't',
  'Ћ': 'Ć', 'ћ': 'ć',
  'У': 'U', 'у': 'u',
  'Ф': 'F', 'ф': 'f',
  'Х': 'H', 'х': 'h',
  'Ц': 'C', 'ц': 'c',
  'Ч': 'Č', 'ч': 'č',
  'Џ': 'Dž', 'џ': 'dž',
  'Ш': 'Š', 'ш': 'š',
};

const latinToCyrillic: Record<string, string> = {
  'A': 'А', 'a': 'а',
  'B': 'Б', 'b': 'б',
  'V': 'В', 'v': 'в',
  'G': 'Г', 'g': 'г',
  'D': 'Д', 'd': 'д',
  'Đ': 'Ђ', 'đ': 'ђ',
  'E': 'Е', 'e': 'е',
  'Ž': 'Ж', 'ž': 'ж',
  'Z': 'З', 'z': 'з',
  'I': 'И', 'i': 'и',
  'J': 'Ј', 'j': 'ј',
  'K': 'К', 'k': 'к',
  'L': 'Л', 'l': 'л',
  'M': 'М', 'm': 'м',
  'N': 'Н', 'n': 'н',
  'O': 'О', 'o': 'о',
  'P': 'П', 'p': 'п',
  'R': 'Р', 'r': 'р',
  'S': 'С', 's': 'с',
  'T': 'Т', 't': 'т',
  'Ć': 'Ћ', 'ć': 'ћ',
  'U': 'У', 'u': 'у',
  'F': 'Ф', 'f': 'ф',
  'H': 'Х', 'h': 'х',
  'C': 'Ц', 'c': 'ц',
  'Č': 'Ч', 'č': 'ч',
  'Š': 'Ш', 'š': 'ш',
};

/**
 * Converts Cyrillic text to Latin script
 * @param text - Text in Cyrillic script
 * @returns Text in Latin script
 */
export function cyrillicToLatinText(text: string): string {
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // Handle digraphs (two-character combinations)
    if (i < text.length - 1) {
      const twoChar = char + text[i + 1];
      if (twoChar === 'Љ' || twoChar === 'љ') {
        result += cyrillicToLatin[twoChar];
        i++; // Skip next character
        continue;
      }
      if (twoChar === 'Њ' || twoChar === 'њ') {
        result += cyrillicToLatin[twoChar];
        i++; // Skip next character
        continue;
      }
      if (twoChar === 'Џ' || twoChar === 'џ') {
        result += cyrillicToLatin[twoChar];
        i++; // Skip next character
        continue;
      }
    }
    
    result += cyrillicToLatin[char] || char;
  }
  
  return result;
}

/**
 * Converts Latin text to Cyrillic script
 * @param text - Text in Latin script
 * @returns Text in Cyrillic script
 */
export function latinToCyrillicText(text: string): string {
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // Handle digraphs (two-character combinations)
    if (i < text.length - 1) {
      const twoChar = char + text[i + 1];
      
      // Check for Latin digraphs
      if (twoChar === 'Lj' || twoChar === 'lj') {
        result += twoChar === 'Lj' ? 'Љ' : 'љ';
        i++; // Skip next character
        continue;
      }
      if (twoChar === 'Nj' || twoChar === 'nj') {
        result += twoChar === 'Nj' ? 'Њ' : 'њ';
        i++; // Skip next character
        continue;
      }
      if (twoChar === 'Dž' || twoChar === 'dž') {
        result += twoChar === 'Dž' ? 'Џ' : 'џ';
        i++; // Skip next character
        continue;
      }
    }
    
    result += latinToCyrillic[char] || char;
  }
  
  return result;
}

/**
 * Automatically detects script and converts to the opposite
 * @param text - Text to transliterate
 * @returns Transliterated text
 */
export function autoTransliterate(text: string): string {
  // Detect if text contains Cyrillic characters
  const hasCyrillic = /[\u0400-\u04FF]/.test(text);
  
  if (hasCyrillic) {
    return cyrillicToLatinText(text);
  } else {
    return latinToCyrillicText(text);
  }
}

/**
 * Checks if text contains Cyrillic characters
 * @param text - Text to check
 * @returns True if text contains Cyrillic characters
 */
export function isCyrillic(text: string): boolean {
  return /[\u0400-\u04FF]/.test(text);
}

/**
 * Normalizes text for search by converting to lowercase and removing diacritics
 * @param text - Text to normalize
 * @returns Normalized text
 */
export function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
}