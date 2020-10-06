import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import {
	setupState,
	materialThemePaletteState,
	currentFilterState,
	currentListState,
	userAvatarClassState,
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

	const [lsSetup] = useLocalStorage('setup', 'true');
	const [lsPalette] = useLocalStorage('palette', 'main');
	const [lsAvatarClass] = useLocalStorage('avatarClass', 'fenix');
	const [lsDateFormat] = useLocalStorage('dateFormat', 'MM/dd/yyyy');
	const [lsFilter] = useLocalStorage('filter', 'today');
	const [lsList] = useLocalStorage('list', '');

	useEffect(() => {
		setSetup(lsSetup === true ? false : true);
		setPalette(lsPalette);
		setAvatarClass(lsAvatarClass);
		setDateFormat(lsDateFormat);
		setFilter(lsFilter);
		setList(lsList);
	});

	return <>{children}</>;
};

export default LocalStorage;
