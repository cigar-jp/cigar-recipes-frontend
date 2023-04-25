import { FC } from 'react'
import { List } from '@mantine/core'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Recipe } from '@prisma/client'
import useStore from '@/store'
import { useMutateRecipe } from '@/hooks/useMutateRecipe'
import { userGetGenreJapanese } from '../constants'

export const RecipeItem: FC<
  Omit<Recipe, 'createdAt' | 'updatedAt' | 'userId'>
> = ({ id, name, nameKana, genre }) => {
  const update = useStore((state) => state.updateEditedRecipe)
  const { deleteRecipeMutation } = useMutateRecipe()

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
              genre
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
      </div>
    </List.Item>
  )
}
