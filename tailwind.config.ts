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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				blinkly: {
					purple: {
						light: '#AF94FF',
						DEFAULT: '#7959E3',
						dark: '#5637BE',
					},
					teal: {
						light: '#9BEFE2',
						DEFAULT: '#34D1BE',
						dark: '#1B9E8E',
					},
					orange: {
						light: '#FFB894',
						DEFAULT: '#FF8847',
						dark: '#E56A24',
					},
					green: {
						light: '#A6EE96',
						DEFAULT: '#52D13C',
						dark: '#3C9E2B',
					},
					gray: {
						50: '#F8F9FC',
						100: '#EEF1F8',
						200: '#DFE4EF',
						300: '#CBD2E2',
						400: '#9CA8C2',
						500: '#6B7A9C',
						600: '#4A577A',
						700: '#364058',
						800: '#232A3A',
						900: '#131722',
					},
				},
				alchemy: {
					purple: {
						light: '#9b87f5',
						DEFAULT: '#8B5CF6',
						dark: '#6E59A5',
					},
					green: {
						light: '#F2FCE2',
						DEFAULT: '#82C91E',
					},
					peach: {
						light: '#FDE1D3',
						DEFAULT: '#F97316',
					},
				},
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
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'linear-gradient(120deg, #5637BE 0%, #7959E3 50%, #AF94FF 100%)',
				'blinkly-gradient': 'linear-gradient(135deg, #7959E3 0%, #34D1BE 100%)',
				'blinkly-orange-gradient': 'linear-gradient(135deg, #FF8847 0%, #FFB894 100%)',
				'blinkly-green-gradient': 'linear-gradient(135deg, #3C9E2B 0%, #A6EE96 100%)',
			},
		}
	},
	plugins: [tailwindAnimate],
} satisfies Config;
