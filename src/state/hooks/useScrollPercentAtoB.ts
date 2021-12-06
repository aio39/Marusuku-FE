import { useEffect, useState } from 'react'

const useScrollPercentAtoB = (a: number, b: number) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY((last) => window.scrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (scrollY < a) return 0
  if (scrollY >= b) return 1

  return (scrollY - a / b - a) / 100
}

export default useScrollPercentAtoB
