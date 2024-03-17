/** @type {import('tailwindcss').Config} */
module.exports = {
  images: {
    domains: ['assets.example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ['assets.example.com', 'wallup.net'],
        pathname: '/account123/**',
      },
    ],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
