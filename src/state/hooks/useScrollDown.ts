import { useEffect, useState } from 'react'

//  down 중인지 / offset 내인지
export default function useScrollDown(y: 'height' | 'width' | number = 0, initShow = false) {
  const [offsetY, setSkipY] = useState(0)
  const [data, setData] = useState({
    // x: 0,
    y: 0,
    // lastX: 0,
    lastY: 0,
  })
  useEffect(() => {
    const handleScroll = () => {
      setData((last) => {
        return {
          // x: window.scrollX,
          y: window.scrollY,
          // lastX: last.x,
          lastY: last.y,
        }
      })
    }
    if (y == 'height') {
      setSkipY(window.innerHeight)
    } else if (y == 'width') {
      setSkipY(window.innerWidth)
    } else {
      setSkipY(y)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isDowning = data.y - data.lastY >= (initShow ? 0.1 : 0) // > = 처음에는 무조건 true
  const isUnderThanOffset = data.y >= offsetY
  const isShow = !isDowning && isUnderThanOffset

  return { isDowning, isUnderThanOffset, isShow }
  // return data.y - data.lastY > 0 || (data.y as number) <= offsetY
}

// export const ScrollContext = createContext(null)
