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
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Production Server**: [serve](https://www.npmjs.com/package/serve)
- **AI**: [Google Gemini API](https://ai.google.dev/gemini-api) (`@google/genai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)

## 🚀 Running Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Build the application for production**:
    ```bash
    npm run build
    ```
3.  **Run the production server**:
    ```bash
    npm start
    ```
    This will start a local server to view the optimized application, behaving exactly as it would in production. For development, you can use `npm run preview`.

## ☁️ Deployment on Render.com

You can deploy this application as a **Web Service** on Render.

1.  **Push to a Git Repository**: Make sure your code is on GitHub, GitLab, or Bitbucket.
2.  **Create a New Web Service on Render**:
    *   Go to your [Render Dashboard](https://dashboard.render.com/).
    *   Click "New +" and select "Web Service".
    *   Connect your Git repository.
3.  **Configure Build Settings**:
    *   **Region**: Choose a region close to you.
    *   **Branch**: `main` (or your default branch).
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
    *   **Instance Type**: The `Free` instance type is sufficient for this application.
4.  **Add Environment Variable**:
    *   Go to the "Environment" tab for your new service.
    *   Click "Add Environment Variable".
    *   Set the **Key** to `API_KEY`.
    *   Set the **Value** to your Google Gemini API key.
5.  **Deploy**:
    *   Click "Create Web Service". Render will automatically build and deploy your application. Your app will be live on a `.onrender.com` URL.

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
├── vite.config.ts      # Vite build configuration
├── tsconfig.json       # TypeScript configuration
└── types.ts            # TypeScript types
```

## 📄 License

This project is licensed under the MIT License.