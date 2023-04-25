import { FormEvent } from 'react'
import { TextInput, Button, Center, Select } from '@mantine/core'
import { IconDatabase } from '@tabler/icons'
import useStore from '@/store'
import { useMutateRecipe } from '@/hooks/useMutateRecipe'

export const RecipeForm = () => {
  const { editedRecipe } = useStore()
  const update = useStore((state) => state.updateEditedRecipe)
  const { createRecipeMutation, updateRecipeMutation } = useMutateRecipe()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedRecipe.id === 0)
      createRecipeMutation.mutate({
        name: editedRecipe.name,
        nameKana: editedRecipe.nameKana,
        genre: editedRecipe.genre
      })
    else {
      updateRecipeMutation.mutate({
        id: editedRecipe.id,
        name: editedRecipe.name,
        nameKana: editedRecipe.nameKana,
        genre: editedRecipe.genre
      })
    }
  }
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
