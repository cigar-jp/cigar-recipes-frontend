import { FC, useCallback } from 'react'
import { List } from '@mantine/core'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Recipe } from '@prisma/client'
import useStore from '@/store'
import { useMutateRecipe } from '@/hooks/useMutateRecipe'
import { userGetGenreJapanese } from '../constants'
import { useQueryIngredients } from '@/hooks/useQueryIngredient'

export const RecipeItem: FC<
  Omit<Recipe, 'createdAt' | 'updatedAt' | 'userId'>
> = ({ id, name, nameKana, genre, price, kcal, ingredientIds }) => {
  const update = useStore((state) => state.updateEditedRecipe)
  const { deleteRecipeMutation } = useMutateRecipe()
  const { data: ingredients } = useQueryIngredients()

  const getFilteredIngredients = useCallback(
    (ingredientIds: number[]) => {
      if (!ingredientIds || !ingredients) return []

      return ingredients.filter((ingredient) => {
        return ingredientIds.includes(ingredient.id)
      })
    },
    [ingredients]
  )

  return (
    <List.Item>
      <div className="mr-10 flex">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              name,
              nameKana,
              genre,
              price,
              kcal,
              ingredientIds: []
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteRecipeMutation.mutate(id)
          }}
        />
      </div>
      <div>
        <p>料理名 ：{name}</p>
        <p>ふりがな：{nameKana}</p>
        <p>ジャンル：{userGetGenreJapanese(genre)}</p>
        <p>価格 ：{price?.toLocaleString()}円</p>
        <p>カロリー：{kcal?.toLocaleString()}kcal</p>
        <p>
          材料 ：
          {getFilteredIngredients(ingredientIds)?.map((ingredient) => (
            <span key={ingredient.id}>{ingredient.name} </span>
          ))}
        </p>
      </div>
    </List.Item>
  )
}
