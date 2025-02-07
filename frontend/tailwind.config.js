/** @type {import('tailwindcss').Config} */
export default {
  content: [
   './src/**/*.{js,jsx,ts,tsx}', // Include all JavaScript/TypeScript files in the src directory
    './public/index.html',        // Include your main HTML file if applicable

  ],
  theme: {
    extend: {
      colors: {
        primary:'#4c662b' ,
        primary_text:'#ffffff',
        primaryhover:'#3f5322',
        primary_container:'#cdeda3',
        primary_container_text:'#102000',
        secondary:'#586249',
        secondary_text:'#ffffff',
        secondaryhover:'#4b513f',
        secondary_container:'#dce7c8',
        secondary_container_text:'#151e0b',



        accent: {
          light: '#1a1c16',
          DEFAULT: '#a855f7',
          dark: '#7e22ce',
        },
        neutral: {
          light: '#f3f4f6',
          DEFAULT: '#e5e7eb',
          dark: '#374151',
        },
        background: '#2f312a',
        surface: '#f9faef',
      },
    },
  },
  plugins: [],
}