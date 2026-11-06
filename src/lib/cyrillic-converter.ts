// ============================================================
// BHS Latin → BHS Cyrillic Converter
// Converts Bosnian/Serbian Latin text to Cyrillic script
// ============================================================

// Latin → Cyrillic mapping (digraphs first, then single chars)
const latinToCyrillicMap: [string, string][] = [
  // Digraphs (must be checked before single characters)
  ['Lj', 'Љ'],
  ['lj', 'љ'],
  ['Nj', 'Њ'],
  ['nj', 'њ'],
  ['Dž', 'Џ'],
  ['dž', 'џ'],
  ['DŽ', 'Џ'],
  // Uppercase
  ['A', 'А'],
  ['B', 'Б'],
  ['V', 'В'],
  ['G', 'Г'],
  ['D', 'Д'],
  ['Đ', 'Ђ'],
  ['E', 'Е'],
  ['Ž', 'Ж'],
  ['Z', 'З'],
  ['I', 'И'],
  ['J', 'Ј'],
  ['K', 'К'],
  ['L', 'Л'],
  ['M', 'М'],
  ['N', 'Н'],
  ['O', 'О'],
  ['P', 'П'],
  ['R', 'Р'],
  ['S', 'С'],
  ['T', 'Т'],
  ['Ć', 'Ћ'],
  ['U', 'У'],
  ['F', 'Ф'],
  ['H', 'Х'],
  ['C', 'Ц'],
  ['Č', 'Ч'],
  ['Š', 'Ш'],
  // Lowercase
  ['a', 'а'],
  ['b', 'б'],
  ['v', 'в'],
  ['g', 'г'],
  ['d', 'д'],
  ['đ', 'ђ'],
  ['e', 'е'],
  ['ž', 'ж'],
  ['z', 'з'],
  ['i', 'и'],
  ['j', 'ј'],
  ['k', 'к'],
  ['l', 'л'],
  ['m', 'м'],
  ['n', 'н'],
  ['o', 'о'],
  ['p', 'п'],
  ['r', 'р'],
  ['s', 'с'],
  ['t', 'т'],
  ['ć', 'ћ'],
  ['u', 'у'],
  ['f', 'ф'],
  ['h', 'х'],
  ['c', 'ц'],
  ['č', 'ч'],
  ['š', 'ш'],
];

/**
 * Convert BHS Latin text to BHS Cyrillic
 * Handles digraphs (lj, nj, dž) correctly
 */
export function latinToCyrillic(text: string): string {
  if (!text) return '';

  let result = '';
  let i = 0;

  while (i < text.length) {
    let matched = false;

    // Try digraphs first (2-char sequences)
    if (i + 1 < text.length) {
      const twoChars = text.substring(i, i + 2);
      for (const [latin, cyrillic] of latinToCyrillicMap) {
        if (latin.length === 2 && twoChars === latin) {
          result += cyrillic;
          i += 2;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      // Try single characters
      const oneChar = text[i];
      let found = false;
      for (const [latin, cyrillic] of latinToCyrillicMap) {
        if (latin.length === 1 && oneChar === latin) {
          result += cyrillic;
          found = true;
          break;
        }
      }
      if (!found) {
        // Keep character as-is (numbers, punctuation, spaces, etc.)
        result += oneChar;
      }
      i += 1;
    }
  }

  return result;
}

/**
 * Cyrillic → Latin mapping (reverse conversion)
 */
const cyrillicToLatinMap: Record<string, string> = {
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Ђ': 'Đ',
  'Е': 'E', 'Ж': 'Ž', 'З': 'Z', 'И': 'I', 'Ј': 'J', 'К': 'K',
  'Л': 'L', 'Љ': 'Lj', 'М': 'M', 'Н': 'N', 'Њ': 'Nj', 'О': 'O',
  'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'Ћ': 'Ć', 'У': 'U',
  'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Č', 'Џ': 'Dž', 'Ш': 'Š',
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ђ': 'đ',
  'е': 'e', 'ж': 'ž', 'з': 'z', 'и': 'i', 'ј': 'j', 'к': 'k',
  'л': 'l', 'љ': 'lj', 'м': 'm', 'н': 'n', 'њ': 'nj', 'о': 'o',
  'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'ћ': 'ć', 'у': 'u',
  'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'č', 'џ': 'dž', 'ш': 'š',
};

/**
 * Convert BHS Cyrillic text to BHS Latin
 */
export function cyrillicToLatin(text: string): string {
  if (!text) return '';

  let result = '';
  for (const char of text) {
    result += cyrillicToLatinMap[char] || char;
  }
  return result;
}

/**
 * Detect if text is primarily Cyrillic
 */
export function isCyrillic(text: string): boolean {
  if (!text) return false;
  const cyrillicChars = text.match(/[\u0400-\u04FF]/g);
  const latinChars = text.match(/[a-zA-ZčćžšđČĆŽŠĐ]/g);
  const cyrillicCount = cyrillicChars?.length || 0;
  const latinCount = latinChars?.length || 0;
  return cyrillicCount > latinCount;
}