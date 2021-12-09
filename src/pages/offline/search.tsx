import { ScrollYFilterForShop } from '@/components/common/button/ScrollYFilter'
import SearchInput from '@/components/common/inputs/SearchInput'
import { default as MobileDefaultLayout } from '@/components/common/layouts/mobileLayout/MobileLayout'
import TopCommonNav from '@/components/common/layouts/mobileLayout/TopCommonNav'
import BottomLoading from '@/components/common/loading/BottomLoading'
import { ShopCardWrapper } from '@/components/shop/ShopCard'
import { usePosition } from '@/state/hooks/usePosition'
import { useShopsInfinite } from '@/state/swr/shops/useShops'
import { CommonFSW } from '@/types/common'
import { Box, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useImmer } from 'use-immer'

export default function OfflineSearch() {
  const { position } = usePosition()
  const [customPosition, setCustomPosition] = useState(position)
  const [searchQuery, setSearchQuery] = useState('')
  const [distance, setDistance] = useState(100000)
  const observerElementRef = useRef<HTMLDivElement>(null)

  const [commonFSW, updateCommonFSW] = useImmer<CommonFSW>({ per_page: 10, sort: ['d.dis'] })

  const { data, isValidating, error, mutate, setSize, size } = useShopsInfinite(
    searchQuery,
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
    if (observerElementRef.current) {
      observer = new IntersectionObserver(
        () => {
          console.log('intersection!', size)
          setSize((pre) => pre + 1)
        },
        {
          threshold: 1,
        }
      )
      observer.observe(observerElementRef.current)
    }
    return () => observer && observer.disconnect()
  }, [observerElementRef, setSize])

  console.log('shopsData', isValidating)
  console.log(searchQuery)

  return (
    <MobileDefaultLayout boxProps={{ px: '8px' }}>
      <TopCommonNav>
        <SearchInput setQuery={setSearchQuery} />
      </TopCommonNav>
      <ScrollYFilterForShop
        commonFSW={commonFSW}
        updateCommonFSW={updateCommonFSW}
      ></ScrollYFilterForShop>

      <VStack width="full" position="relative">
        {/* {shopsData ? (
          shopsData.map((shop, idx) => <ShopCard shop={shop} key={idx} />)
        ) : (
          <Box>No Data</Box>
        )} */}
        <ShopCardWrapper shops={shopsData} isValidating={isValidating} />
        <Box
          position="absolute"
          bottom="1200px"
          height="0"
          bgColor="black"
          ref={observerElementRef}
        ></Box>
        <BottomLoading isLoading={isValidating}> </BottomLoading>
      </VStack>
    </MobileDefaultLayout>
  )
}
