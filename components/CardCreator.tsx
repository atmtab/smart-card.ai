import React, { useState, useCallback } from 'react';
import { UserData, TemplateStyle, SocialLink, SocialPlatform } from '../types';
import BusinessCard from './BusinessCard';
import QRCodeDisplay from './QRCodeDisplay';
import { generateBio } from '../services/geminiService';
import { 
    UserIcon, BriefcaseIcon, BuildingIcon, PhoneIcon, MailIcon, LinkIcon, SparklesIcon,
    TrashIcon, PlusIcon, LinkedInIcon, TelegramIcon, GitHubIcon, TwitterIcon 
} from './icons';

interface CardCreatorProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

interface FormFieldProps {
  id: keyof UserData;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  as?: 'textarea';
}

const FormField: React.FC<FormFieldProps> = ({ id, label, value, onChange, type = 'text', placeholder, icon, as }) => {
  const InputComponent = as === 'textarea' ? 'textarea' : 'input';
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary-color)] mb-1">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-muted-color)]">{icon}</span>
        <InputComponent
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full bg-[var(--bg-secondary-color)] border border-[var(--border-color)] rounded-md py-2 pl-10 pr-3 text-[var(--text-color)] placeholder-[var(--text-muted-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition"
          rows={as === 'textarea' ? 3 : undefined}
        />
      </div>
    </div>
  );
};

const socialPlatforms: { id: SocialPlatform; name: string; icon: React.ReactNode; placeholder: string }[] = [
    { id: 'website', name: 'Website', icon: <LinkIcon className="w-5 h-5" />, placeholder: 'your-portfolio.com' },
    { id: 'linkedin', name: 'LinkedIn', icon: <LinkedInIcon className="w-5 h-5" />, placeholder: 'linkedin.com/in/username' },
    { id: 'github', name: 'GitHub', icon: <GitHubIcon className="w-5 h-5" />, placeholder: 'github.com/username' },
    { id: 'twitter', name: 'Twitter (X)', icon: <TwitterIcon className="w-5 h-5" />, placeholder: 'twitter.com/username' },
    { id: 'telegram', name: 'Telegram', icon: <TelegramIcon className="w-5 h-5" />, placeholder: 't.me/username' },
];

const SocialLinksManager: React.FC<{
    socials: SocialLink[];
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}> = ({ socials, setUserData }) => {

    const handleSocialChange = (id: string, field: keyof Omit<SocialLink, 'id'>, value: string) => {
        setUserData(prev => ({
            ...prev,
            socials: prev.socials.map(link => 
                link.id === id ? { ...link, [field]: value } : link
            ),
        }));
    };

    const handleAddSocial = () => {
        setUserData(prev => ({
            ...prev,
            socials: [...prev.socials, { id: crypto.randomUUID(), platform: 'website', url: '' }],
        }));
    };
    
    const handleRemoveSocial = (id: string) => {
        setUserData(prev => ({
            ...prev,
            socials: prev.socials.filter(link => link.id !== id),
        }));
    };
    
    const allPlatforms = [...socialPlatforms, { id: 'custom' as 'custom', name: 'Custom', icon: <LinkIcon className="w-5 h-5"/>, placeholder: 'Enter URL' }];

    return (
        <div>
            <label className="block text-sm font-medium text-[var(--text-secondary-color)] mb-2">Social Links</label>
            <div className="space-y-3">
                {socials.map((link) => (
                    <div key={link.id} className="bg-black/10 p-3 rounded-lg border border-[var(--border-color)]">
                        <div className="flex items-center gap-2">
                            <div className="flex-shrink-0">
                                <select
                                    value={link.platform}
                                    onChange={(e) => handleSocialChange(link.id, 'platform', e.target.value)}
                                    className="bg-[var(--bg-secondary-color)] border border-[var(--border-color)] rounded-md py-2 pl-3 pr-8 text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition appearance-none"
                                    aria-label="Social platform"
                                    style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`}}
                                >
                                    {allPlatforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="relative flex-grow">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--text-muted-color)]">
                                    {allPlatforms.find(p => p.id === link.platform)?.icon || <LinkIcon className="w-5 h-5"/>}
                                </span>
                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => handleSocialChange(link.id, 'url', e.target.value)}
                                    placeholder={allPlatforms.find(p => p.id === link.platform)?.placeholder || 'Enter URL'}
                                    className="block w-full bg-[var(--bg-secondary-color)] border border-[var(--border-color)] rounded-md py-2 pl-10 pr-3 text-[var(--text-color)] placeholder-[var(--text-muted-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition"
                                    aria-label="Social link URL"
                                />
                            </div>
                            <button
                                onClick={() => handleRemoveSocial(link.id)}
                                className="p-2 text-[var(--text-muted-color)] hover:text-red-400 rounded-md transition-colors"
                                aria-label="Remove social link"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                        {link.platform === 'custom' && (
                             <div className="relative mt-2">
                                <input
                                    type="text"
                                    value={link.customPlatformName || ''}
                                    onChange={(e) => handleSocialChange(link.id, 'customPlatformName', e.target.value)}
                                    placeholder="Platform Name (e.g., Behance)"
                                    className="block w-full bg-[var(--bg-secondary-color)] border border-[var(--border-color)] rounded-md py-2 px-3 text-[var(--text-color)] placeholder-[var(--text-muted-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition"
                                    aria-label="Custom platform name"
                                />
                            </div>
                        )}
                    </div>
                ))}
                <button
                    onClick={handleAddSocial}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-dashed border-[var(--border-color)] text-[var(--text-secondary-color)] hover:bg-[var(--bg-secondary-color)] hover:text-[var(--text-color)] rounded-md transition"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Link
                </button>
            </div>
        </div>
    );
};

const StyleSelector: React.FC<{ selected: TemplateStyle; onChange: (template: TemplateStyle) => void }> = ({ selected, onChange }) => {
  const templates: { id: TemplateStyle; name: string }[] = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'elegant', name: 'Elegant' },
  ];
  return (
    <div>
       <label className="block text-sm font-medium text-[var(--text-secondary-color)] mb-2">Card Style</label>
       <div className="flex gap-2">
        {templates.map(template => (
          <button 
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${selected === template.id ? 'bg-[var(--accent-color)] text-[var(--accent-text-color)]' : 'bg-[var(--bg-secondary-color)] hover:brightness-110 text-[var(--text-color)]'}`}
          >
            {template.name}
          </button>
        ))}
       </div>
    </div>
  );
}

const CardCreator: React.FC<CardCreatorProps> = ({ userData, setUserData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }, [setUserData]);

  const handleStyleChange = useCallback((style: TemplateStyle) => {
    setUserData(prev => ({...prev, cardStyle: style}))
  }, [setUserData]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, [setUserData]);

  const handleGenerateBio = useCallback(async () => {
    setIsGenerating(true);
    const bio = await generateBio(userData.name, userData.title, userData.company);
    setUserData(prev => ({ ...prev, bio }));
    setIsGenerating(false);
  }, [userData.name, userData.title, userData.company, setUserData]);

  return (
    <section id="creator" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Section */}
          <div className="bg-[var(--card-form-bg)] p-8 rounded-xl border border-[var(--border-color)] transition-colors duration-300">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-color)]">Customize Your Card</h2>
            <div className="space-y-4">
              <FormField id="name" label="Full Name" value={userData.name} onChange={handleChange} placeholder="e.g., Alex Doe" icon={<UserIcon className="w-5 h-5" />} />
              <FormField id="title" label="Title / Position" value={userData.title} onChange={handleChange} placeholder="e.g., Product Designer" icon={<BriefcaseIcon className="w-5 h-5" />} />
              <FormField id="company" label="Company / Organization" value={userData.company} onChange={handleChange} placeholder="e.g., PixelPerfect Inc." icon={<BuildingIcon className="w-5 h-5" />} />
              
              <div className="border-t border-[var(--border-color)] my-6"></div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-[var(--text-secondary-color)] mb-1">Short Bio</label>
                <div className="relative">
                  <textarea id="bio" name="bio" value={userData.bio} onChange={handleChange} placeholder="A brief, professional bio" className="block w-full bg-[var(--bg-secondary-color)] border border-[var(--border-color)] rounded-md py-2 px-3 text-[var(--text-color)] placeholder-[var(--text-muted-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition" rows={3}></textarea>
                  <button 
                    onClick={handleGenerateBio} 
                    disabled={isGenerating}
                    className="absolute bottom-2 right-2 bg-[var(--accent-color)] hover:bg-[var(--accent-hover-color)] disabled:bg-slate-600 disabled:cursor-not-allowed text-[var(--accent-text-color)] text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 transition-colors">
                    <SparklesIcon className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'AI Generate'}
                  </button>
                </div>
              </div>
              
              <div className="border-t border-[var(--border-color)] my-6"></div>

              <FormField id="phone" label="Phone Number" type="tel" value={userData.phone} onChange={handleChange} placeholder="+1 234 567 8900" icon={<PhoneIcon className="w-5 h-5" />} />
              <FormField id="email" label="Email Address" type="email" value={userData.email} onChange={handleChange} placeholder="you@example.com" icon={<MailIcon className="w-5 h-5" />} />
              
              <SocialLinksManager socials={userData.socials} setUserData={setUserData} />
              
              <div className="border-t border-[var(--border-color)] my-6"></div>
              
              <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium text-[var(--text-secondary-color)] mb-1">Profile Picture</label>
                <input id="profilePicture" name="profilePicture" type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-[var(--text-secondary-color)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent-color)] file:text-[var(--accent-text-color)] hover:file:bg-[var(--accent-hover-color)]"/>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <StyleSelector selected={userData.cardStyle} onChange={handleStyleChange} />
                <div>
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-[var(--text-secondary-color)] mb-2">Accent Color</label>
                  <input
                    id="primaryColor"
                    type="color"
                    value={userData.primaryColor}
                    onChange={(e) => setUserData(prev => ({...prev, primaryColor: e.target.value}))}
                    className="w-24 h-10 p-1 bg-[var(--bg-secondary-color)] border border-[var(--border-color)] rounded-md cursor-pointer"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Preview Section */}
          <div className="sticky top-28 flex flex-col items-center gap-8">
            <h3 className="text-2xl font-bold text-center text-[var(--text-color)]">Live Preview</h3>
            <BusinessCard data={userData} />
            <div className="w-full max-w-sm">
                <QRCodeDisplay data={userData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardCreator;
