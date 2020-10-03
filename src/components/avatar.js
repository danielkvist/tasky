import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Avatar = ({ alt, height, width, avatarClass, level = '01' }) => {
	return (
		<LazyLoadImage
			alt={alt}
			height={height}
			effect="blur"
			src={`/avatars/${avatarClass}/${level}.png`}
			width={width}
		/>
	);
};

export default Avatar;
