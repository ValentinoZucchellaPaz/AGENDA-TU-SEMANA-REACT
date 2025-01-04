import type { Config } from "tailwindcss";
import tailwindAnimated from "tailwindcss-animate"

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: '#2d2d96',
				secondary: 'rgb(203, 203, 233)',
				darkGray: '#444',
				transparentBlack: 'rgba(0, 0, 0, 0.2)',
				danger: 'rgb(199, 28, 28)',
				success: 'rgb(128, 214, 42)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [tailwindAnimated],
} satisfies Config;