export const getColorCode = (color) => {
  const colorMap = {
    blue: '#1E90FF',
    brown: '#8B4513',
    green: '#228B22',
    hazel: '#D2691E',
    black: '#000000',
    blonde: '#FFD700',
    'n/a': '#808080',
    // Add more colors as needed
  };
  return colorMap[color.toLowerCase()] || color;
};

export const getGenderIcon = (gender) => {
  switch (gender.toLowerCase()) {
    case 'male':
      return 'mars';
    case 'female':
      return 'venus';
    default:
      return 'genderless';
  }
};

export const getAvatarUrl = (name) => {
  return `https://robohash.org/${encodeURIComponent(name)}?set=set5`;
};
