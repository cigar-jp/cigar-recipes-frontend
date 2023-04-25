import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import { LogoutIcon } from '@heroicons/react/solid'
import { Layout } from '@/components/commons/Layout'
import { UserInfo } from '@/components/atoms/UserInfo'
import { useQueryClient } from '@tanstack/react-query'
import { RecipeForm } from '@/components/molecules/RecipeForm'
import { RecipeList } from '@/components/organisms/RecipeList'
import { Divider } from '@mantine/core'
import { RecipesTable } from '@/components/organisms/RecipeTable'

const Recipes: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const signout = async () => {
    queryClient.removeQueries(['recipes'])
    queryClient.removeQueries(['user'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`)
    router.push('/')
  }

  return (
    <Layout title="Recipes List">
      <div className="flex w-full items-center justify-between">
        <div
          className="flex cursor-pointer items-center text-blue-500"
          onClick={signout}
        >
          <span className="mr-2">サインアウト</span>

          <LogoutIcon className="h-6 w-6" />
        </div>

        <UserInfo />
      </div>

      <RecipeForm />

      <Divider my="xl" className="w-8/12" />

      {/* <RecipeSearch />  */}

      <RecipeList />

      <Divider className="my-24 w-8/12" />

      <RecipesTable />
    </Layout>
  )
}

export default Recipes
