import React, { useState } from 'react';
import { UserData } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import CardCreator from './components/CardCreator';
import Footer from './components/Footer';
import { ThemeProvider } from './hooks/useTheme';

function App() {
  const [userData, setUserData] = useState<UserData>({
    name: 'Alex Doe',
    title: 'Senior Product Designer',
    company: 'PixelPerfect Inc.',
    phone: '+1 234 567 8900',
    email: 'alex.doe@example.com',
    socials: [
      { id: '1', platform: 'website', url: 'pixelperfect.design' },
      { id: '2', platform: 'linkedin', url: 'linkedin.com/in/alex-doe' }
    ],
    bio: 'Crafting intuitive user experiences and leading design teams to build beautiful, human-centered products.',
    profilePicture: 'https://picsum.photos/seed/smartcard/200',
    cardStyle: 'modern',
    primaryColor: '#06b6d4' // Default to cyan
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans selection:bg-[var(--accent-color)] selection:text-[var(--accent-text-color)] transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <CardCreator userData={userData} setUserData={setUserData} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
