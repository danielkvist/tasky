import React from 'react';
import { useRecoilValue } from 'recoil';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { userAvatarClassState } from '../recoil/atoms';

const Avatar = ({ alt, height, width }) => {
	const avatarClass = useRecoilValue(userAvatarClassState);

	return (
		<LazyLoadImage
			alt={alt}
			height={height}
			effect="blur"
			src={`/avatars/${avatarClass}/01.png`}
			width={width}
		/>
	);
};

export default Avatar;
