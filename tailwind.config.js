/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		logs: false,
		themes: [
			{
				mytheme: {
					primary: '#009eb8',

					secondary: '#007b00',

					accent: '#00aaac',

					neutral: '#1e282f',

					'base-100': '#043127',

					info: '#00a7c2',

					success: '#00c368',

					warning: '#ff6400',

					error: '#ff97ae'
				}
			}
		]
	}
};
