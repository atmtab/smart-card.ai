import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-color)] border-t border-[var(--border-color)] mt-20 transition-colors duration-300">
      <div className="container mx-auto px-6 py-8 text-center text-[var(--text-muted-color)]">
        <p>&copy; {new Date().getFullYear()} SmartCard.AI. All Rights Reserved.</p>
        <p className="mt-2 text-sm">A new generation of digital business cards, built with AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
