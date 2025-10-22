# SmartCard.AI - Digital Business Card Generator

An innovative AI-powered platform to create, customize, and share modern digital business cards. Ditch paper and network smarter with SmartCard.AI.

This application allows users to generate a personalized digital business card, enhance it with an AI-generated biography, and share it easily via a QR code.

## ✨ Features

- **AI-Powered Bio Generation**: Instantly create a professional, concise bio using the Google Gemini API.
- **Live Preview**: See your digital business card update in real-time as you customize it.
- **Fully Customizable**: Edit your name, title, company, contact details, and more.
- **Multiple Templates**: Choose from 'Modern', 'Classic', and 'Elegant' styles to match your personal brand.
- **Profile Picture Upload**: Add a personal touch with your own photo.
- **QR Code Sharing**: A dynamic QR code is generated containing your vCard details for easy sharing and saving to contacts.
- **Downloadable QR Code**: Easily download a high-quality PNG of your QR code.
- **Responsive Design**: Looks great on any device, from desktops to mobile phones.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **AI**: [Google Gemini API](https://ai.google.dev/gemini-api) (`@google/genai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)

## 🚀 How to Use

1.  Navigate to the application.
2.  Fill in your personal and professional details in the form on the left.
3.  Click the **AI Generate** button to create a unique bio based on your title and company.
4.  Upload a professional profile picture.
5.  Select a card style that you like.
6.  Your card will instantly update in the live preview.
7.  Click **Download QR Code** to save an image that you can share with anyone. Scanning it will import your contact details directly into their phone.

## 📂 Project Structure

```
.
├── components/         # Reusable React components
│   ├── BusinessCard.tsx
│   ├── CardCreator.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── QRCodeDisplay.tsx
│   └── icons.tsx
├── services/           # Services for external APIs
│   └── geminiService.ts
├── App.tsx             # Main application component
├── index.html          # Main HTML file
├── index.tsx           # React entry point
├── metadata.json       # Application metadata
└── types.ts            # TypeScript types
```

## 📄 License

This project is licensed under the MIT License.
