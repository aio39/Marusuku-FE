import { ScrollYFilterForShop } from '@/components/common/button/ScrollYFilter'
import { default as MobileDefaultLayout } from '@/components/common/layouts/mobileLayout/MobileLayout'
import TopCommonNav from '@/components/common/layouts/mobileLayout/TopCommonNav'
import ShopCard from '@/components/shop/ShopCard'
import { usePosition } from '@/state/hooks/usePosition'
import { useShopsInfinite } from '@/state/swr/shops/useShops'
import { CommonFSW } from '@/types/common'
import { PhoneIcon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useImmer } from 'use-immer'

export default function OfflineSearch() {
  const { position } = usePosition()
  const [customPosition, setCustomPosition] = useState(position)
  const [distance, setDistance] = useState(100000)
  const ref = useRef<HTMLDivElement>(null)

  const [commonFSW, updateCommonFSW] = useImmer<CommonFSW>({ per_page: 10, sort: ['d.dis'] })

  const { data, isValidating, error, mutate, setSize, size } = useShopsInfinite(
    commonFSW,
    customPosition
      ? { distance, lat: customPosition.latitude, lng: customPosition.longitude }
      : undefined,
    customPosition ? false : true
  )
  const shopsData = data?.flatMap((data) => data.data)

  useEffect(() => {
    setCustomPosition(position)
  }, [position])

  useEffect(() => {
    let observer: IntersectionObserver
    if (ref.current) {
      observer = new IntersectionObserver(
        () => {
          console.log('intersection!', size)
          setSize((pre) => pre + 1)
        },
        {
          threshold: 1,
        }
      )
      observer.observe(ref.current)
    }
    return () => observer && observer.disconnect()
  }, [ref, setSize])

  // console.log('shopsData', shopsData)

  return (
    <MobileDefaultLayout boxProps={{ px: '8px' }}>
      <TopCommonNav>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<PhoneIcon color="gray.300" />} />
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>
      </TopCommonNav>
      <ScrollYFilterForShop
        commonFSW={commonFSW}
        updateCommonFSW={updateCommonFSW}
      ></ScrollYFilterForShop>
      <Box position="relative">
        {shopsData ? (
          shopsData.map((shop, idx) => <ShopCard shop={shop} key={idx} />)
        ) : (
          <Box>No Data</Box>
        )}
        <Box position="absolute" bottom="600px" height="0" bgColor="black" ref={ref}></Box>
      </Box>
    </MobileDefaultLayout>
  )
}
