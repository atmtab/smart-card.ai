import React from 'react';

const Hero = () => {
  return (
    <section className="py-20 md:py-32 text-center bg-grid">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--text-color)] leading-tight mb-4 animate-fade-in-down">
          The Future of Networking is Here.
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary-color)] max-w-3xl mx-auto mb-8 animate-fade-in-up">
          Create and share stunning digital business cards with the power of AI. Eco-friendly, intelligent, and unforgettable.
        </p>
        <a href="#creator" className="bg-[var(--accent-color)] hover:bg-[var(--accent-hover-color)] text-[var(--accent-text-color)] font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 inline-block transform hover:scale-105 animate-fade-in-up">
          Create Your Card Now
        </a>
      </div>
       <style>{`
        .bg-grid {
            background-image: linear-gradient(to right, var(--border-color) 1px, transparent 1px), linear-gradient(to bottom, var(--border-color) 1px, transparent 1px);
            background-size: 2rem 2rem;
            transition: background-image 0.3s ease-in-out;
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards 0.2s; }
      `}</style>
    </section>
  );
};

export default Hero;
