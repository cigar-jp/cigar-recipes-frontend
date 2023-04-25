import { List, ThemeIcon, Loader } from '@mantine/core'
import { IconNotebook } from '@tabler/icons'
import { useQueryRecipes } from '@/hooks/useQueryRecipes'
import { RecipeItem } from '../atoms/RecipeItem'

export const RecipeList = () => {
  const { data: recipes, status } = useQueryRecipes()
  if (status === 'loading') return <Loader my="lg" color="cyan" />
  return (
    <List
      my="lg"
      spacing="md"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconNotebook size={16} />
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
          price={recipe.price}
          kcal={recipe.kcal}
          ingredientIds={recipe.ingredientIds}
        />
      ))}
    </List>
  )
}
