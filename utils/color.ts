import { TemplateStyle } from '../types';

// Helper to convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Helper to calculate luminance
const isLight = (hex: string): boolean => {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.6;
};

// Helper to adjust brightness
const adjustColor = (hex: string, percent: number): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    const amount = Math.floor(255 * (percent / 100));

    const newR = Math.max(0, Math.min(255, rgb.r + amount));
    const newG = Math.max(0, Math.min(255, rgb.g + amount));
    const newB = Math.max(0, Math.min(255, rgb.b + amount));
    
    return `#${(1 << 24 | newR << 16 | newG << 8 | newB).toString(16).slice(1).padStart(6, '0')}`;
};

interface CardPalette {
  bg: string;
  text: string;
  accent: string;
  title: string;
  border: string;
}

export const generateCardPalette = (primaryColor: string, style: TemplateStyle): CardPalette => {
  const primaryIsLight = isLight(primaryColor);

  switch (style) {
    case 'classic':
      return {
        bg: '#ffffff',
        text: '#4a5568', // gray-700
        accent: primaryColor,
        title: '#1a202c', // gray-900
        border: '#e2e8f0', // gray-200
      };
    case 'elegant':
      const darkBgElegant = adjustColor(primaryColor, -50);
      return {
        bg: `linear-gradient(to br, ${adjustColor(darkBgElegant, -10)}, ${darkBgElegant})`,
        text: '#a0aec0', // gray-400
        accent: primaryColor,
        title: '#ffffff',
        border: `${primaryColor}66`, // add alpha
      };
    case 'modern':
    default:
      const darkBgModern = adjustColor(primaryColor, -60);
      return {
        bg: `linear-gradient(to br, ${adjustColor(darkBgModern, 10)}, ${darkBgModern})`,
        text: '#d1d5db', // gray-300
        accent: primaryColor,
        title: '#ffffff',
        border: `${primaryColor}4D`, // add alpha
      };
  }
};
