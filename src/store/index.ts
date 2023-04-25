import create from 'zustand'
import { EditedRecipe } from '../types'

type State = {
  editedRecipe: EditedRecipe
  updateEditedRecipe: (payload: EditedRecipe) => void
  resetEditedRecipe: () => void
}

const useStore = create<State>((set) => ({
  editedRecipe: {
    id: 0,
    name: '',
    nameKana: '',
    genre: 'meat',
    price: 0,
    kcal: 0,
    ingredientIds: []
  },

  updateEditedRecipe: (payload) =>
    set({
      editedRecipe: {
        id: payload.id,
        name: payload.name,
        nameKana: payload.nameKana,
        genre: payload.genre,
        price: payload.price,
        kcal: payload.kcal,
        ingredientIds: payload.ingredientIds
      }
    }),

  resetEditedRecipe: () =>
    set({
      editedRecipe: {
        id: 0,
        name: '',
        nameKana: '',
        genre: 'meat',
        price: 0,
        kcal: 0,
        ingredientIds: []
      }
    })
}))

export default useStore
