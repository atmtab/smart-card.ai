export type TemplateStyle = 'modern' | 'classic' | 'elegant';

export type SocialPlatform = 'website' | 'linkedin' | 'telegram' | 'github' | 'twitter';

export interface SocialLink {
  id: string;
  platform: SocialPlatform | 'custom';
  url: string;
  customPlatformName?: string;
}

export interface UserData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  socials: SocialLink[];
  bio: string;
  profilePicture: string | null;
  cardStyle: TemplateStyle;
  primaryColor: string;
}
