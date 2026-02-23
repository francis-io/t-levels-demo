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
				'surface-0': '#F4F7FB',
				'surface-1': '#FFFFFF',
				'ink-900': '#0F172A',
				'ink-700': '#334155',
				'ink-500': '#64748B',
				'state-success': '#16A34A',
				'state-warning': '#D97706',
				'state-danger': '#DC2626',
			},
			fontFamily: {
				display: ['Titillium Web', 'system-ui', 'sans-serif'],
				sans: ['Inter Variable', 'system-ui', 'sans-serif'],
				mono: ['IBM Plex Mono', 'monospace'],
			},
			animation: {
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				electricity: 'electricity 1.5s ease-in-out infinite',
				'fade-up': 'fade-up 600ms ease-out forwards',
			},
			keyframes: {
				electricity: {
					'0%': { backgroundPosition: '100% 0' },
					'100%': { backgroundPosition: '-100% 0' },
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
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
