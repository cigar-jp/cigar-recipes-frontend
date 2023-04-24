import { useRouter } from 'next/router'
import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Recipe } from '@prisma/client'
import useStore from '../store'
import { EditedRecipe } from '../types'

export const useMutateRecipe = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const reset = useStore((state) => state.resetEditedRecipe)

  const createRecipeMutation = useMutation(
    async (recipe: Omit<EditedRecipe, 'id'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/recipe`,
        recipe
      )
      return res.data
    },

    {
      onSuccess: (res) => {
        const prevRecipes = queryClient.getQueryData<Recipe[]>(['recipes'])
        if (prevRecipes) {
          queryClient.setQueryData(['recipes'], [res, ...prevRecipes])
        }
        reset()
      },

      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      }
    }
  )

  const updateRecipeMutation = useMutation(
    async (recipe: EditedRecipe) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipe/${recipe.id}`,
        recipe
      )
      return res.data
    },

    {
      onSuccess: (res, variables) => {
        const prevRecipes = queryClient.getQueryData<Recipe[]>(['recipes'])
        if (prevRecipes) {
          queryClient.setQueryData(
            ['recipes'],
            prevRecipes.map((recipe) => (recipe.id === res.id ? res : recipe))
          )
        }
        reset()
      },

      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      }
    }
  )

  const deleteRecipeMutation = useMutation(
    async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${id}`)
    },

    {
      onSuccess: (_, variables) => {
        const prevRecipes = queryClient.getQueryData<Recipe[]>(['recipes'])
        if (prevRecipes) {
          queryClient.setQueryData(
            ['recipes'],
            prevRecipes.filter((recipe) => recipe.id !== variables)
          )
        }
        reset()
      },

      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      }
    }
  )

  return { createRecipeMutation, updateRecipeMutation, deleteRecipeMutation }
}
