import { List, ThemeIcon, Loader } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons'
import { useQueryRecipes } from '@/hooks/useQueryRecipes'
import { RecipeItem } from '../atoms/RecipeItem'

export const RecipeList = () => {
  const { data: recipes, status } = useQueryRecipes()
  if (status === 'loading') return <Loader my="lg" color="cyan" />
  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      {recipes?.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          nameKana={recipe.nameKana}
          genre={recipe.genre}
        />
      ))}
    </List>
  )
}
