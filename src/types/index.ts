export type AuthForm = {
  email: string
  password: string
}

export type EditedRecipe = {
  id: number
  name: string
  nameKana: string
  genre: string
  price: number
  kcal: number
  ingredientIds: number[]
}
