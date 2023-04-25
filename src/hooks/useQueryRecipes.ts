import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Recipe } from '@prisma/client'

type FilterParams = {
  name?: string
  kanaName?: string
  genre?: string
  price?: number
  kcal?: number
}

export const useQueryRecipes = (params: FilterParams = {}) => {
  const router = useRouter()

  const getRecipes = async () => {
    const queryString = Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    const { data } = await axios.get<Recipe[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/recipe?${queryString}`
    )
    return data
  }

  // const getFilteredRecipes = async () => {
  //   const queryString = Object.entries(params)
  //     .filter(([, value]) => Boolean(value))
  //     .map(([key, value]) => `${key}=${value}`)
  //     .join('&')

  //   const { data } = await axios.get<Recipe[]>(
  //     `${process.env.NEXT_PUBLIC_API_URL}/recipe?${queryString}`
  //   )
  //   return data
  // }

  return useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: getRecipes,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/')
    }
  })
}
