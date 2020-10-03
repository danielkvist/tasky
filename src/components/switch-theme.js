import React from 'react';
import { useRecoilState } from 'recoil';
import { Trans } from 'react-i18next';
import { Grid, Switch, Typography } from '@material-ui/core';

import { materialThemeTypeState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const SwitchTheme = () => {
	const [themeType, setThemeType] = useRecoilState(materialThemeTypeState);
	const [, setLsTheme] = useLocalStorage('theme', themeType);

	return (
		<Typography component="div">
			<Grid component="label" container alignItems="center" spacing={1}>
				<Grid item>
					<Trans i18nKey="config.theme">Dark mode</Trans>
				</Grid>
				<Grid item>
					<Switch
						checked={themeType === 'dark'}
						onChange={() => {
							setThemeType(themeType === 'dark' ? 'light' : 'dark');
							setLsTheme(themeType === 'dark' ? 'light' : 'dark');
						}}
						name="dark-mode"
					/>
				</Grid>
			</Grid>
		</Typography>
	);
};

export default SwitchTheme;
