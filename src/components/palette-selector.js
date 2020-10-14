import React from 'react';
import { Trans } from 'react-i18next';
import { Grid, Radio, Typography } from '@material-ui/core';
import { blue, green, red, deepPurple } from '@material-ui/core/colors';

import useLocalStorage from '../hooks/use-local-storage';

// TODO: add alert when palette changes to refresh
const PaletteSelector = () => {
	const [lsPalette, setLsPalette] = useLocalStorage('palette', 'main');

	const handleChange = (e) => {
		setLsPalette(e.target.value);
	};

	return (
		<Typography component="div">
			<Grid component="label" container alignItems="center" spacing={1}>
				<Grid item>
					<Trans i18nKey="config.palette">Palette</Trans>
				</Grid>
				<Grid item>
					<Radio
						checked={lsPalette === 'main'}
						onChange={handleChange}
						value="main"
						name="palette-selector"
						inputProps={{ 'aria-label': 'main' }}
						style={{
							color: blue[400],
							'&$checked': {
								color: blue[700],
							},
						}}
					/>
					<Radio
						checked={lsPalette === 'green'}
						onChange={handleChange}
						value="green"
						name="palette-selector"
						inputProps={{ 'aria-label': 'secondary' }}
						style={{
							color: green[400],
							'&$checked': {
								color: green[700],
							},
						}}
					/>
					<Radio
						checked={lsPalette === 'red'}
						onChange={handleChange}
						value="red"
						name="palette-selector"
						inputProps={{ 'aria-label': 'red' }}
						style={{
							color: red[400],
							'&$checked': {
								color: red[700],
							},
						}}
					/>
					<Radio
						checked={lsPalette === 'purple'}
						onChange={handleChange}
						value="purple"
						name="palette-selector"
						inputProps={{ 'aria-label': 'purple' }}
						style={{
							color: deepPurple[400],
							'&$checked': {
								color: deepPurple[700],
							},
						}}
					/>
				</Grid>
			</Grid>
		</Typography>
	);
};

export default PaletteSelector;
