import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import correctLevel from '../utils/avatar-level';

const Avatar = ({ alt, height, width, avatarClass, level }) => {
	const correctedLvl = correctLevel(avatarClass, level);

	return (
		<LazyLoadImage
			alt={alt}
			height={height}
			effect="blur"
			placeholderSrc={`/avatars/${avatarClass}/${`${correctedLvl}`.padStart(
				2,
				0
			)}.jpg`}
			src={`/avatars/${avatarClass}/${`${correctedLvl}`.padStart(2, 0)}.webp`}
			width={width}
		/>
	);
};

export default Avatar;
