import { useRouter } from 'next/router'

const Menu = () => {
  const router = useRouter()
  console.log(router.query)

  return <div>aaa</div>
}

export default Menu
