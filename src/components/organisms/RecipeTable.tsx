import { useEffect, useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch
} from '@tabler/icons'
import { useQueryRecipes } from '@/hooks/useQueryRecipes'
import { Recipe } from '@prisma/client'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important'
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    }
  },

  icon: {
    width: theme.spacing.xl,
    height: theme.spacing.xl,
    borderRadius: theme.radius.sm
  }
}))

interface RowData
  extends Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'userId'> {}

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  )
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]))
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]))
    }),
    payload.search
  )
}

function convertToRowDataArray(recipes: Recipe[] | undefined): RowData[] {
  return (
    recipes?.map((recipe) => {
      const { name, nameKana, genre, price, kcal, ingredientIds } = recipe
      return { name, nameKana, genre, price, kcal, ingredientIds }
    }) ?? []
  )
}

export const RecipesTable = () => {
  const [search, setSearch] = useState('')
  const { data: recipes } = useQueryRecipes()
  const rowData = convertToRowDataArray(recipes)

  const [sortedData, setSortedData] = useState(rowData)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  useEffect(() => {
    setSortedData(
      sortData(rowData, { sortBy, reversed: reverseSortDirection, search })
    )
  }, [rowData, search, sortBy, reverseSortDirection])

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(rowData, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(rowData, {
        sortBy,
        reversed: reverseSortDirection,
        search: value
      })
    )
  }

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.nameKana}</td>
      <td>{row.genre}</td>
      <td>{row.price}</td>
      <td>{row.kcal}</td>
    </tr>
  ))

  return (
    <ScrollArea>
      <TextInput
        placeholder="料理名などで検索してください"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed' }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              料理名
            </Th>
            <Th
              sorted={sortBy === 'nameKana'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('nameKana')}
            >
              料理名（カナ）
            </Th>
            <Th
              sorted={sortBy === 'genre'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('genre')}
            >
              ジャンル
            </Th>
            <Th
              sorted={sortBy === 'price'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('price')}
            >
              価格
            </Th>
            <Th
              sorted={sortBy === 'kcal'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('kcal')}
            >
              カロリー
            </Th>
          </tr>
        </thead>

        <tbody>
          {rows && rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={rowData ? Object.keys(rowData).length : 0}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
