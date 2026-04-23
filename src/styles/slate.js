// src/styles/slate.js
// "Slate" — the default dark/light theme.
// Each style exports a `dark` and `light` object of CSS variable overrides.
// Variable names map 1:1 to what App.css uses via data-theme.

const slate = {
  key: 'slate',
  label: 'Slate',

  dark: {
    '--btn-highlight-color': '#656389',
    '--text-highlight-color': '#a7a5f9',
    '--accent': '#a7a5f9',
    '--accent-dim': 'rgba(167, 165, 249, 0.15)',
    '--accent-border': 'rgba(167, 165, 249, 0.3)',
    '--background': '#121212',
    '--surface': '#1a1a20',
    '--surface-2': '#232329',
    '--text-color': '#D3D3D3',
    '--text-secondary': 'rgba(211, 211, 211, 0.45)',
    '--text-tertiary': 'rgba(211, 211, 211, 0.25)',
    '--border-color': 'rgba(255, 255, 255, 0.08)',
    '--border-hover': 'rgba(167, 165, 249, 0.4)',
    '--hover-bg': 'rgba(255, 255, 255, 0.05)',
    '--island-backdrop': '#232329',
    '--input-bg': 'rgba(255, 255, 255, 0.04)',
    '--input-bg-focus': 'rgba(167, 165, 249, 0.07)',
    '--shadow': '0 4px 24px rgba(0,0,0,0.4)',
    '--shadow-lg': '0 8px 48px rgba(0,0,0,0.6)',
  },

  light: {
    '--btn-highlight-color': '#656389',
    '--text-highlight-color': '#6c6abf',
    '--accent': '#6c6abf',
    '--accent-dim': 'rgba(101, 99, 137, 0.12)',
    '--accent-border': 'rgba(101, 99, 137, 0.35)',
    '--background': '#f0f0f5',
    '--surface': '#ffffff',
    '--surface-2': '#ececf3',
    '--text-color': '#1a1a1a',
    '--text-secondary': 'rgba(26, 26, 26, 0.5)',
    '--text-tertiary': 'rgba(26, 26, 26, 0.3)',
    '--border-color': 'rgba(0, 0, 0, 0.08)',
    '--border-hover': 'rgba(101, 99, 137, 0.5)',
    '--hover-bg': 'rgba(0, 0, 0, 0.04)',
    '--island-backdrop': '#ececf3',
    '--input-bg': 'rgba(0, 0, 0, 0.03)',
    '--input-bg-focus': 'rgba(101, 99, 137, 0.06)',
    '--shadow': '0 4px 24px rgba(0,0,0,0.08)',
    '--shadow-lg': '0 8px 48px rgba(0,0,0,0.12)',
  },
};

export default slate;