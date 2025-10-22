import React, { useMemo } from 'react';
import { UserData } from '../types';
import { DownloadIcon } from './icons';
import { useTheme } from '../hooks/useTheme';

const QRCodeDisplay = ({ data }: { data: UserData }) => {
  const { theme } = useTheme();

  const qrData = useMemo(() => {
    let vCard = `BEGIN:VCARD
VERSION:3.0
N:${data.name}
FN:${data.name}
TITLE:${data.title}
ORG:${data.company}
TEL;TYPE=WORK,VOICE:${data.phone}
EMAIL:${data.email}
NOTE:${data.bio}`;

    data.socials.forEach(social => {
        if (social.url) {
            const fullUrl = !social.url.startsWith('http') ? `https://${social.url}` : social.url;
            vCard += `\nURL:${fullUrl}`;
        }
    });
    
    vCard += `\nEND:VCARD`;
    return encodeURIComponent(vCard);
  }, [data]);
  
  const qrThemeColors = useMemo(() => ({
    night: { bg: '1e293b', color: 'e2e8f0' },
    day: { bg: 'ffffff', color: '1e293b' },
    minimal: { bg: 'ffffff', color: '111827' },
  }), []);


  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${qrData}&bgcolor=${qrThemeColors[theme].bg}&color=${qrThemeColors[theme].color}&qzone=1`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `smartcard-qr-${data.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="bg-[var(--bg-secondary-color)] rounded-lg p-6 flex flex-col items-center gap-4 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-[var(--text-color)]">Share Your Card</h3>
      <div className="p-3 bg-[var(--bg-color)] rounded-md">
        <img src={qrImageUrl} alt="QR Code" width="256" height="256" className="rounded-sm" />
      </div>
      <button 
        onClick={handleDownload}
        className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-hover-color)] text-[var(--accent-text-color)] font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors duration-300">
        <DownloadIcon className="w-5 h-5" />
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeDisplay;
