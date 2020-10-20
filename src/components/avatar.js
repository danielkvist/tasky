import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import correctLevel from '../utils/avatar-level';

const Avatar = ({ alt, height, width, avatarClass, level }) => {
	const correctedLvl = `${correctLevel(avatarClass, level)}`.padStart(2, 0);

	return (
		<LazyLoadImage
			alt={alt}
			height={height}
			placeholderSrc={`/avatars/${avatarClass}/${correctedLvl}-min.webp`}
			src={`/avatars/${avatarClass}/${correctedLvl}.webp`}
			width={width}
		/>
	);
};

export default Avatar;
