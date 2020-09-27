import { createMuiTheme } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';

const drawerWidth = 240;

const base = {
	palette: {
		type: 'light',
		primary: blue,
		secondary: green,
	},
	props: {
		drawerWidth,
	},
};

const main = createMuiTheme({ ...base });

const mainDark = createMuiTheme({
	...base,
	palette: {
		...base.palette,
		type: 'dark',
	},
});

export { main, mainDark };
