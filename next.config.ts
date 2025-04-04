// next.config.mjs 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configs like reactStrictMode
  i18n: {
    locales: ['en', 'nl'], // Your supported languages (e.g., English, Dutch)
    defaultLocale: 'en', // The default language if none is specified in URL
    // localeDetection: false // Optional: Set to false if you don't want Next.js to auto-redirect based on browser language
  },
};

export default nextConfig;