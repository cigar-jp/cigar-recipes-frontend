import { FormEvent, useCallback } from 'react'
import { TextInput, Button, Center, Select, MultiSelect } from '@mantine/core'
import { IconDatabase } from '@tabler/icons'
import useStore from '@/store'
import { useMutateRecipe } from '@/hooks/useMutateRecipe'
import { useQueryIngredients } from '@/hooks/useQueryIngredient'
import { Ingredient } from '@prisma/client'

function convertToMultiSelectItemArray(ingredients: Ingredient[] | undefined) {
  return (
    ingredients?.map((ingredient) => {
      return { label: ingredient.name, value: String(ingredient.id) }
    }) ?? []
  )
}

export const RecipeForm = () => {
  const { editedRecipe } = useStore()
  const update = useStore((state) => state.updateEditedRecipe)
  const { createRecipeMutation, updateRecipeMutation } = useMutateRecipe()
  const { data: ingredients } = useQueryIngredients()

  const multiSelectItemArray = convertToMultiSelectItemArray(ingredients)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedRecipe.id === 0)
      createRecipeMutation.mutate({
        name: editedRecipe.name,
        nameKana: editedRecipe.nameKana,
        genre: editedRecipe.genre,
        ingredientIds: editedRecipe.ingredientIds,
        price: calculatePrice(editedRecipe.ingredientIds),
        kcal: calculateKcal(editedRecipe.ingredientIds)
      })
    else {
      updateRecipeMutation.mutate({
        id: editedRecipe.id,
        name: editedRecipe.name,
        nameKana: editedRecipe.nameKana,
        genre: editedRecipe.genre,
        ingredientIds: editedRecipe.ingredientIds,
        price: calculatePrice(editedRecipe.ingredientIds),
        kcal: calculateKcal(editedRecipe.ingredientIds)
      })
    }
  }

  const calculatePrice = useCallback(
    (ingredientIds: number[]) => {
      if (!ingredientIds || !ingredients) return 0

      const filteredIngredients = ingredients.filter((ingredient) =>
        ingredientIds.includes(ingredient.id)
      )
      return filteredIngredients.reduce((sum, ingredient) => {
        return sum + ingredient.price
      }, 0)
    },
    [ingredients]
  )

  const calculateKcal = useCallback(
    (ingredientIds: number[]) => {
      if (!ingredientIds || !ingredients) return 0

      const filteredIngredients = ingredients.filter((ingredient) =>
        ingredientIds.includes(ingredient.id)
      )
      return filteredIngredients.reduce((sum, ingredient) => {
        return sum + ingredient.kcal
      }, 0)
    },
    [ingredients]
  )

  return (
    <>
      <form onSubmit={handleSubmit} className="w-4/12">
        <TextInput
          mt="md"
          placeholder="ミートパイ"
          label="料理名"
          value={editedRecipe.name || ''}
          onChange={(e) => update({ ...editedRecipe, name: e.target.value })}
        />

        <TextInput
          mt="md"
          placeholder="みーとぱい"
          label="料理名（カナ）"
          value={editedRecipe.nameKana || ''}
          onChange={(e) =>
            update({ ...editedRecipe, nameKana: e.target.value })
          }
        />

        <Select
          mt="md"
          withinPortal
          data={['meat', 'fish', 'salad']}
          placeholder="meat"
          label="ジャンル"
          value={editedRecipe.genre}
          onChange={(value) => update({ ...editedRecipe, genre: value || '' })}
        />

        <MultiSelect
          mt="md"
          withinPortal
          data={multiSelectItemArray || []}
          placeholder="材料"
          label="材料"
          onChange={(value) =>
            update({
              ...editedRecipe,
              ingredientIds: value.map((v) => Number(v))
            })
          }
        />

        <Center mt="lg">
          <Button
            disabled={editedRecipe.name === '' || editedRecipe.nameKana === ''}
            leftIcon={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {editedRecipe.id === 0 ? '作成' : '更新'}
          </Button>
        </Center>
      </form>
    </>
  )
}
