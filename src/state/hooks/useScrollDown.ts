import { useEffect, useState } from 'react'

export default function useScrollDown() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      setData((last) => {
        return {
          x: window.scrollX,
          y: window.scrollY,
          lastX: last.x,
          lastY: last.y,
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //  data.y > 150 &&
  return data.y - data.lastY > 0
}

// export const ScrollContext = createContext(null)
