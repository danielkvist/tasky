const avatars = {
	chakra: 7,
	fenix: 9,
	tardigrade: 8,
	ygdrasil: 8,
};

const correctLevel = (avatarClass, level) => {
	if (level === 'avatar') return level;
	else if (level > avatars[avatarClass]) return avatars[avatarClass];
	else return level;
};

export default correctLevel;
