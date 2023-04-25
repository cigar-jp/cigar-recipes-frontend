export const userGetGenreJapanese = (genre: string) => {
  switch (genre) {
    case 'meat':
      return '肉料理'
    case 'fish':
      return '魚料理'
    case 'salad':
      return 'サラダ'
    default:
      return '--'
  }
}
