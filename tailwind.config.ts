
import type { Config } from "tailwindcss";

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
				// Forest theme colors using CSS variables
				forest: {
					50: 'hsl(var(--forest-50))',
					100: 'hsl(var(--forest-100))',
					200: 'hsl(var(--forest-200))',
					300: 'hsl(var(--forest-300))',
					400: 'hsl(var(--forest-400))',
					500: 'hsl(var(--forest-500))',
					600: 'hsl(var(--forest-600))',
					700: 'hsl(var(--forest-700))',
					800: 'hsl(var(--forest-800))',
					900: 'hsl(var(--forest-900))',
					950: 'hsl(var(--forest-950))'
				},
				earth: {
					50: 'hsl(var(--earth-50))',
					100: 'hsl(var(--earth-100))',
					200: 'hsl(var(--earth-200))',
					300: 'hsl(var(--earth-300))',
					400: 'hsl(var(--earth-400))',
					500: 'hsl(var(--earth-500))',
					600: 'hsl(var(--earth-600))',
					700: 'hsl(var(--earth-700))',
					800: 'hsl(var(--earth-800))',
					900: 'hsl(var(--earth-900))'
				},
				fire: {
					50: 'hsl(var(--fire-50))',
					100: 'hsl(var(--fire-100))',
					200: 'hsl(var(--fire-200))',
					300: 'hsl(var(--fire-300))',
					400: 'hsl(var(--fire-400))',
					500: 'hsl(var(--fire-500))',
					600: 'hsl(var(--fire-600))',
					700: 'hsl(var(--fire-700))',
					800: 'hsl(var(--fire-800))',
					900: 'hsl(var(--fire-900))'
				}
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
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'slide-up': 'slide-up 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
