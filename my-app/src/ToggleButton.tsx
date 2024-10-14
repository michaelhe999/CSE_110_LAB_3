import React from 'react';
import { useTheme } from './ThemeContext';

export function ToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme.background,
        color: theme.color,
        padding: '10px 20px',
        border: `1px solid ${theme.color}`,
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Toggle Theme
    </button>
  );
}