import React, { useMemo } from 'react';
import { UserData, SocialPlatform } from '../types';
import { generateCardPalette } from '../utils/color';
import { PhoneIcon, MailIcon, LinkIcon, UserIcon, LinkedInIcon, GitHubIcon, TwitterIcon, TelegramIcon } from './icons';

const socialIconMap: Record<SocialPlatform, React.ReactNode> = {
    website: <LinkIcon className="w-4 h-4" />,
    linkedin: <LinkedInIcon className="w-4 h-4" />,
    github: <GitHubIcon className="w-4 h-4" />,
    twitter: <TwitterIcon className="w-4 h-4" />,
    telegram: <TelegramIcon className="w-4 h-4" />,
};

const BusinessCard = ({ data }: { data: UserData }) => {
  const styles = useMemo(() => generateCardPalette(data.primaryColor, data.cardStyle), [data.primaryColor, data.cardStyle]);

  const getSocialIcon = (platform: SocialPlatform | 'custom') => {
      return socialIconMap[platform as SocialPlatform] || <LinkIcon className="w-4 h-4" />;
  }

  return (
    <div 
        className="w-full max-w-sm h-auto min-h-[20rem] p-6 rounded-2xl shadow-2xl flex flex-col justify-between transition-all duration-500 transform perspective-1000 rotate-y-5 hover:rotate-y-0 border"
        style={{ background: styles.bg, borderColor: styles.border }}
    >
      <style>{`
        .perspective-1000 { transform-style: preserve-3d; perspective: 1000px; }
        .rotate-y-5 { transform: rotateY(5deg); }
        .hover\\:rotate-y-0:hover { transform: rotateY(0deg); }
      `}</style>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{color: styles.title}}>{data.name || 'Your Name'}</h2>
          <p className="font-medium" style={{color: styles.accent}}>{data.title || 'Your Title'}</p>
          <p className="text-sm" style={{color: styles.text}}>{data.company || 'Your Company'}</p>
        </div>
        <div className="w-16 h-16 rounded-full bg-slate-700/50 border-2 flex items-center justify-center overflow-hidden flex-shrink-0" style={{borderColor: styles.border}}>
          {data.profilePicture ? (
            <img src={data.profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-8 h-8 text-slate-500" />
          )}
        </div>
      </div>
      
      <p className="text-sm italic my-4" style={{color: styles.text}}>{data.bio || 'A short and professional bio about you.'}</p>

      <div className="border-t pt-4" style={{borderColor: styles.border}}>
        <div className="space-y-2 text-sm">
          {data.phone && (
            // Fix: The PhoneIcon component does not accept a style prop. The color is applied to the parent div and inherited by the icon via `currentColor`.
            <div className="flex items-center gap-3" style={{ color: styles.accent }}>
              <PhoneIcon className="w-4 h-4" />
              <span style={{ color: styles.text }}>{data.phone}</span>
            </div>
          )}
          {data.email && (
            // Fix: The MailIcon component does not accept a style prop. The color is applied to the parent div and inherited by the icon via `currentColor`.
            <div className="flex items-center gap-3" style={{ color: styles.accent }}>
              <MailIcon className="w-4 h-4" />
              <span style={{ color: styles.text }}>{data.email}</span>
            </div>
          )}
          {data.socials && data.socials.map(social => (
            social.url && <a 
              key={social.id}
              href={!social.url.startsWith('http') ? `https://${social.url}` : social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span style={{color: styles.accent}}>{getSocialIcon(social.platform)}</span>
              <span style={{color: styles.text}} className="group-hover:underline truncate">
                {(social.platform === 'custom' && social.customPlatformName) ? social.customPlatformName : social.url.replace(/^(https?:\/\/)?(www\.)?/, '')}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;