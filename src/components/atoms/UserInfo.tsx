import { useQueryUser } from '@/hooks/userQueryUser'
import { Loader } from '@mantine/core'

export const UserInfo = () => {
  const { data: user, status } = useQueryUser()

  if (status === 'loading') return <Loader />
  return <p>{user?.email}</p>
}
