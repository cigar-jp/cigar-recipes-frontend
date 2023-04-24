export type AuthForm = {
  email: string
  password: string
}

export type EditedRecipe = {
  id: number
  name: string
  namekana: string
  genre: 'meat' | 'fish' | 'salad'
}
