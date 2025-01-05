export const getOutfitIcon = (outfit: string): string => {
  const outfitLower = outfit.toLowerCase();
  if (outfitLower.includes('coat')) return 'coat-rack';
  if (outfitLower.includes('jacket')) return 'zip-box';
  if (outfitLower.includes('umbrella')) return 'umbrella';
  if (outfitLower.includes('sunglasses')) return 'sunglasses';
  if (outfitLower.includes('boots')) return 'shoe-formal';
  if (outfitLower.includes('shoes')) return 'shoe-sneaker';
  if (outfitLower.includes('scarf')) return 'format-wrap-tight';
  if (outfitLower.includes('gloves')) return 'hand-front-right';
  if (outfitLower.includes('hat')) return 'hat-fedora';
  if (outfitLower.includes('thermal')) return 'thermometer';
  if (outfitLower.includes('pants') || outfitLower.includes('jeans')) return 'archive';
  if (outfitLower.includes('t-shirt')) return 'tshirt-crew';
  if (outfitLower.includes('shirt')) return 'tshirt-v';
  if (outfitLower.includes('shorts')) return 'archive-outline';
  if (outfitLower.includes('sandals')) return 'shoe-cleat';
  if (outfitLower.includes('sweater')) return 'hanger';
  return 'tshirt-crew'; // default icon
}; 