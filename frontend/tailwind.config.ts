import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: [
					'Poppins',
					'sans-serif'
				],
				sans: [
					'Robotto',
					'sans-serif'
				]
			},
			fontSize: {
				customSearch: '1.35rem',
				title: '12px'
			},
			padding: {
				customPad: '.35em .35em 0'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'primary': 'linear-gradient(135deg, #1a1a1a, #16161d)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
