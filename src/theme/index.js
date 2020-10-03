import { blue, green, red, deepPurple } from '@material-ui/core/colors';

const drawerWidth = 270;

const darkVersion = (theme) => {
	return { ...theme, palette: { ...theme.palette, type: 'dark' } };
};

const main = {
	palette: {
		type: 'light',
		primary: blue,
	},
	props: {
		drawerWidth,
	},
};

const mainDark = darkVersion(main);

const greenTheme = {
	...main,
	palette: { ...main.palette, primary: green },
};

const greenThemeDark = darkVersion(greenTheme);

const redTheme = {
	...main,
	palette: { ...main.palette, primary: red },
};

const redThemeDark = darkVersion(redTheme);

const purpleTheme = {
	...main,
	palette: { ...main.palette, primary: deepPurple },
};

const purpleThemeDark = darkVersion(purpleTheme);

export {
	main,
	mainDark,
	greenTheme,
	greenThemeDark,
	redTheme,
	redThemeDark,
	purpleTheme,
	purpleThemeDark,
};
