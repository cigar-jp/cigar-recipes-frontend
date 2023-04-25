import { FormEvent, useState } from 'react'
import { TextInput, Button, Center, Select } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { useQueryRecipes } from '@/hooks/useQueryRecipes'

interface FilterParams {
  name?: string
  nameKana?: string
  genre?: string
}

export const RecipeSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    nameKana: '',
    genre: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const filteredParams: FilterParams = Object.entries(searchParams)
      .filter(([, value]) => Boolean(value))
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value || '' }), {})

    setSearchParams(
      Object.assign({}, { name: '', nameKana: '', genre: '' }, filteredParams)
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-4/12">
        <TextInput
          mt="md"
          placeholder="ミートパイ"
          label="料理名"
          value={searchParams.name}
          onChange={(e) =>
            setSearchParams({
              ...searchParams,
              name: e.target.value
            })
          }
        />

        <TextInput
          mt="md"
          placeholder="みーとぱい"
          label="料理名（カナ）"
          value={searchParams.nameKana}
          onChange={(e) =>
            setSearchParams({
              ...searchParams,
              nameKana: e.target.value
            })
          }
        />

        <Select
          mt="md"
          withinPortal
          data={['meat', 'fish', 'salad']}
          placeholder="meat"
          label="ジャンル"
        />

        <Center mt="lg">
          <Button
            disabled={searchParams.name === '' && searchParams.nameKana === ''}
            leftIcon={<IconSearch size={14} />}
            color="cyan"
            type="submit"
          >
            検索
          </Button>
        </Center>
      </form>
    </>
  )
}
