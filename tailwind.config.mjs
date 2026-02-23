/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Brand colors from TLC logo
				'brand-navy': '#1E1B4B',
				'brand-mint': '#50E8A8',
				'brand-cyan': '#50D8E8',
			},
			fontFamily: {
				display: ['Titillium Web', 'system-ui', 'sans-serif'],
				sans: ['Titillium Web', 'system-ui', 'sans-serif'],
				mono: ['IBM Plex Mono', 'monospace'],
			},
			animation: {
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				electricity: 'electricity 1.5s ease-in-out infinite',
			},
			keyframes: {
				electricity: {
					'0%': { backgroundPosition: '100% 0' },
					'100%': { backgroundPosition: '-100% 0' },
				},
			},
			screens: {
				mobile: '0px',
				tablet: '768px',
				desktop: '1024px',
			},
		},
	},
	plugins: [],
};
