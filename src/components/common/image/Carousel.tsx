import { Center, useInterval } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { wrap } from 'popmotion'
import * as React from 'react'
import { useState } from 'react'

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export const Carousel: React.FC<{ images: string[]; intervalMs?: number }> = ({
  images,
  intervalMs = null,
}) => {
  const [[page, direction], setPage] = useState([0, 1])

  useInterval(() => {
    setPage((pre) => [pre[0] + pre[1], pre[1]])
  }, intervalMs || null) // 0일 경우 방지

  const imageIndex = wrap(0, images.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <Center
      position="relative"
      width="480px"
      height="240px"
      maxH="50vw"
      maxW="100vw"
      overflow="hidden"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          className="carousel_img"
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        ></motion.img>
      </AnimatePresence>
      <Center className="next" onClick={() => paginate(1)}>
        {'>'}
      </Center>
      <Center className="prev" onClick={() => paginate(-1)}>
        {'<'}
      </Center>
    </Center>
  )
}
