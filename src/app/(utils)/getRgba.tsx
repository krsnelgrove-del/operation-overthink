// Tuple representing [R, G, B]
type RGB = [number, number, number];

export enum COLORS {
  neonGreen = "neonGreen",
  vibrantOrange = "vibrantOrange",
  cyanGlow = "cyanGlow",
  glassContainer = "glassContainer",
  inputSlotBg = "inputSlotBg",
  deepSpaceBg = "deepSpaceBg",
  primaryText = "primaryText",
  secondaryText = "secondaryText",
  terminalRed = "terminalRed"
}

export const THEME_RGB: Record<string, RGB> = {
  neonGreen: [0, 255, 102],
  vibrantOrange: [251, 146, 60],
  cyanGlow: [0, 229, 255],
  glassContainer: [13, 17, 23],
  inputSlotBg: [24, 24, 27],
  deepSpaceBg: [5, 8, 17],
  primaryText: [255, 255, 255],
  secondaryText: [156, 163, 175],
  terminalRed: [239, 68, 68],
  darkCharcoal: [25, 25, 25],
};

/**
 * Returns an rgba() string with custom opacity
 * Usage: getRgba('neonGreen', 0.5) -> "rgba(0, 255, 102, 0.5)"
 */
export function getRgba(colorKey: keyof typeof THEME_RGB, alpha: number = 1.0): string {
  const [r, g, b] = THEME_RGB[colorKey];
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}