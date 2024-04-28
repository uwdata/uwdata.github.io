export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Avenir', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
		}
	},
	variants: {
		extend: {
			visibility: ['group-hover']
		}
	},
	plugins: []
};
