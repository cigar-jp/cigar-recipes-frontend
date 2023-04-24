import create from 'zustand'
import { EditedRecipe } from '../types'

type State = {
  editedRecipe: EditedRecipe
  updateEditedRecipe: (payload: EditedRecipe) => void
  resetEditedRecipe: () => void
}

const useStore = create<State>((set) => ({
  editedRecipe: { id: 0, name: '', namekana: '', genre: 'meat' },

  updateEditedRecipe: (payload) =>
    set({
      editedRecipe: {
        id: payload.id,
        name: payload.name,
        namekana: payload.namekana,
        genre: payload.genre
      }
    }),

  resetEditedRecipe: () =>
    set({ editedRecipe: { id: 0, name: '', namekana: '', genre: 'meat' } })
}))

export default useStore
