import { atom } from 'recoil';

const materialThemeTypeState = atom({
	key: 'materialThemeTypeState',
	default: 'light',
});

export { materialThemeTypeState };
