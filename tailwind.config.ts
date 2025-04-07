
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Soft, muted color palette
        blinkly: {
          purple: {
            light: '#D3D1F9',    // Soft lavender
            DEFAULT: '#8B7FD4',   // Gentle periwinkle
            dark: '#6A5ACD',      // Soft slate blue
          },
          teal: {
            light: '#B3E5FC',    // Soft sky blue
            DEFAULT: '#4FBCDF',   // Soft azure
            dark: '#2E8B57',      // Soft sea green
          },
          orange: {
            light: '#FFE4CA',    // Soft peach
            DEFAULT: '#FBB477',   // Soft coral
            dark: '#F4A460',      // Soft sandy brown
          },
          green: {
            light: '#E8F5E9',    // Soft mint
            DEFAULT: '#81C784',   // Soft sage green
            dark: '#2E7D32',      // Soft forest green
          },
          gray: {
            50: '#F9FAFB',       // Almost white, very soft gray
            100: '#F5F7FA',      // Very light gray with a hint of blue
            200: '#E9EEF4',      // Soft gray with a touch of blue
            300: '#D1D9E6',      // Muted gray-blue
            400: '#A0AEC0',      // Soft slate gray
            500: '#718096',      // Medium gray with blue undertones
            600: '#4A5568',      // Dark gray with blue hint
            700: '#2D3748',      // Deep gray-blue
            800: '#1A202C',      // Very deep gray-blue
            900: '#0F1625',      // Almost black with blue undertones
          },
        },
      },
      backgroundImage: {
        // Soft, muted gradients
        'soft-purple-gradient': 'linear-gradient(135deg, #D3D1F9 0%, #8B7FD4 100%)',
        'soft-blue-gradient': 'linear-gradient(135deg, #B3E5FC 0%, #4FBCDF 100%)',
        'soft-peach-gradient': 'linear-gradient(135deg, #FFE4CA 0%, #FBB477 100%)',
        'soft-green-gradient': 'linear-gradient(135deg, #E8F5E9 0%, #81C784 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(120deg, #6E59A5 0%, #7E69AB 50%, #9b87f5 100%)',
        'blinkly-gradient': 'linear-gradient(135deg, #7E69AB 0%, #33C3F0 100%)',
        'blinkly-orange-gradient': 'linear-gradient(135deg, #FEC6A1 0%, #FDE1D3 100%)',
        'blinkly-green-gradient': 'linear-gradient(135deg, #5C8F17 0%, #F2FCE2 100%)',
        'soft-blue-gradient': 'linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'float': 'float 3s infinite ease-in-out',
      },
    }
  },
  plugins: [tailwindAnimate],
} satisfies Config;
