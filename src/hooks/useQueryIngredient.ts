import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Ingredient } from '@prisma/client'

export const useQueryIngredients = () => {
  const router = useRouter()

  const getIngredients = async () => {
    const { data } = await axios.get<Ingredient[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/ingredient`
    )
    return data
  }

  return useQuery<Ingredient[], Error>({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/')
    }
  })
}
