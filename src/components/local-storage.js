import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import {
	setupState,
	materialThemePaletteState,
	currentFilterState,
	currentListState,
	userAvatarClassState,
	userLevelState,
	userExpState,
	dateFormatState,
} from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const LocalStorage = ({ children }) => {
	const setSetup = useSetRecoilState(setupState);
	const setPalette = useSetRecoilState(materialThemePaletteState);
	const setFilter = useSetRecoilState(currentFilterState);
	const setList = useSetRecoilState(currentListState);
	const setDateFormat = useSetRecoilState(dateFormatState);
	const setAvatarClass = useSetRecoilState(userAvatarClassState);
	const setLevel = useSetRecoilState(userLevelState);
	const setExp = useSetRecoilState(userExpState);

	const [lsSetup] = useLocalStorage('setup', 'true');
	const [lsPalette] = useLocalStorage('palette', 'main');
	const [lsAvatarClass] = useLocalStorage('avatarClass', 'fenix');
	const [lsUserLevel] = useLocalStorage('userLevel', 1);
	const [lsUserExp] = useLocalStorage('userExp', 10);
	const [lsDateFormat] = useLocalStorage('dateFormat', 'MM/dd/yyyy');
	const [lsFilter] = useLocalStorage('filter', 'today');
	const [lsList] = useLocalStorage('list', '');

	useEffect(() => {
		setAvatarClass(lsAvatarClass);
		setDateFormat(lsDateFormat);
		setExp(lsUserExp);
		setFilter(lsFilter);
		setLevel(lsUserLevel);
		setList(lsList);
		setPalette(lsPalette);
		setSetup(lsSetup === true ? false : true);
	});

	return <>{children}</>;
};

export default LocalStorage;
