import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Recipe } from '@prisma/client'

export const useQueryRecipes = () => {
  const router = useRouter()

  const getRecipes = async () => {
    const { data } = await axios.get<Recipe[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/recipe`
    )
    return data
  }

  return useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: getRecipes,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/')
    }
  })
}
