import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Trans } from 'react-i18next';
import { Grid, Typography, Select, MenuItem } from '@material-ui/core';

import { dateFormatState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const DateFormatSelector = () => {
	const setDateFormat = useSetRecoilState(dateFormatState);
	const [lsDateFormat, setLsDateFormat] = useLocalStorage(
		'dateFormat',
		'MM/dd/yyyy'
	);

	const handleChange = (e) => {
		setLsDateFormat(e.target.value);
		setDateFormat(e.target.value);
	};

	return (
		<Typography component="div">
			<Grid component="label" container alignItems="center" spacing={1}>
				<Grid item>
					<Trans i18nKey="config.dateFormat">Date format</Trans>
				</Grid>
				<Grid item>
					<Select
						labelId="date-format"
						id="date-format"
						value={lsDateFormat}
						onChange={handleChange}
					>
						<MenuItem value="MM/dd/yyyy">mm/dd/yyyy</MenuItem>
						<MenuItem value="dd/MM/yyyy">dd/mm/yyyy</MenuItem>
					</Select>
				</Grid>
			</Grid>
		</Typography>
	);
};

export default DateFormatSelector;
