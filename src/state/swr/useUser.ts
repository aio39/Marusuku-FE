import { axiosI, fetcher } from '@/state/fetcher'
import { LoginData, User } from '@/types/User'
import { mutate } from 'swr'
import useSWRImmutable from 'swr/immutable'
import laggy from './middleware/laggy'

const URL_USER = '/api/users'
const URL_LOGIN = '/api/login'
const URL_LOGOUT = '/api/logout'

const useUser = () => {
  const aFetcher = (url: string) => {
    const isExistToken = document.cookie.match(/^(.*;)?\s*logged\s*=\s*[^;]+(.*)?$/)
    console.log('isExistToken', isExistToken)
    if (!isExistToken) return Promise.resolve(undefined)
    console.log('useUser 실행')
    return fetcher(url)
  }

  const { data, error, mutate, isValidating } = useSWRImmutable<User>(URL_USER, aFetcher, {
    errorRetryCount: 5,
    use: [laggy],
  })

  const isNotLogged = !isValidating && !data // 확인중이 아니며, 데이터가 undefined

  return { data, error, mutate, isValidating, isNotLogged }
}

const useLogin = async (loginData: LoginData) => {
  try {
    const { data, status } = await axiosI.post<User>(`${URL_LOGIN}`, loginData)
    mutate(URL_USER, data, false)
    return true
  } catch (error) {
    return false
  }
}

const useLogOut = async () => {
  try {
    const { data, status } = await axiosI.get(`${URL_LOGOUT}`)
    return undefined
  } catch (error) {
    return undefined
  }
}
export { useLogin, useUser, useLogOut }
