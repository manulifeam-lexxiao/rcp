import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#282B3E',
          50: '#f7f7f8',
          100: '#e8e8eb',
          200: '#d1d2d7',
          300: '#babcc3',
          400: '#a3a6af',
          500: '#282B3E',
          600: '#1f2130',
          700: '#161824',
          800: '#0d0f18',
          900: '#04050c',
        },
        accent: {
          DEFAULT: '#EC6453',
          50: '#fef2f1',
          100: '#fee5e2',
          200: '#fccbc5',
          300: '#fab1a8',
          400: '#f8978b',
          500: '#EC6453',
          600: '#e84d3a',
          700: '#d03a39',
          800: '#a52e2d',
          900: '#7a2321',
        },
        success: {
          DEFAULT: '#00A758',
          50: '#e6f9f0',
          100: '#ccf3e1',
          200: '#99e7c3',
          300: '#66dba5',
          400: '#33cf87',
          500: '#00A758',
          600: '#008646',
          700: '#006535',
          800: '#004323',
          900: '#002212',
        },
        neutral: {
          light: '#FAFAFA',
          border: '#EDEDED',
          gray: '#DDDEE4',
          platinum: '#E5E4E2',
        },
      },
      fontFamily: {
        sans: ['ManulifeReg', 'Arial', 'Helvetica', 'sans-serif'],
        demibold: ['ManulifeDemiBold', 'Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        '22': '22px',
        '28': '28px',
      },
      lineHeight: {
        '24': '24px',
        '26': '26px',
        '28': '28px',
      },
    },
  },
  plugins: [],
} satisfies Config;
