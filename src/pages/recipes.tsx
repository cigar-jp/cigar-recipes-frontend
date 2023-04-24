import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import { LogoutIcon } from '@heroicons/react/solid'
import { Layout } from '../components/commons/Layout'

const Recipes: NextPage = () => {
  const router = useRouter()

  const signout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`)
    router.push('/')
  }

  return (
    <Layout title="Recipes List">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signout}
      />
    </Layout>
  )
}

export default Recipes
