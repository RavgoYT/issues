// src/styles/index.js
// Add new styles here. Each style must export { key, label, dark, light }.
import slate from './slate';

const STYLES = {
  slate,
};

export default STYLES;

// Apply a style's variables to :root for the given theme
export function applyStyle(styleKey, theme) {
  const style = STYLES[styleKey] ?? STYLES.slate;
  const vars = style[theme] ?? style.dark;
  const root = document.documentElement;
  for (const [prop, val] of Object.entries(vars)) {
    root.style.setProperty(prop, val);
  }
}