import React from 'react';
import { useTheme, Theme } from '../hooks/useTheme';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const themes: { name: Theme; label: string }[] = [
    { name: 'night', label: 'Night' },
    { name: 'day', label: 'Day' },
    { name: 'minimal', label: 'Minimal' },
  ];

  return (
    <div className="flex items-center bg-[var(--bg-secondary-color)] rounded-full p-1 border border-[var(--border-color)]">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
            theme === t.name
              ? 'bg-[var(--accent-color)] text-[var(--accent-text-color)]'
              : 'text-[var(--text-secondary-color)] hover:bg-[var(--bg-tertiary-color)]'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

const Header = () => {
  return (
    <header className="bg-bg-color/70 backdrop-blur-lg sticky top-0 z-50 border-b border-[var(--border-color)] transition-colors duration-300">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-[var(--text-color)]">
          <a href="#" className="flex items-center gap-2">
            <span className="text-[var(--accent-color)]">Smart</span>Card.AI
          </a>
        </div>
        <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <a href="#creator" className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover-color)] text-[var(--accent-text-color)] font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hidden sm:block">
              Create Yours
            </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
