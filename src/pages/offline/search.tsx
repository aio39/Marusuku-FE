import { ScrollYFilterForShop } from '@/components/common/button/ScrollYFilter'
import { default as MobileDefaultLayout } from '@/components/common/layouts/mobileLayout/MobileLayout'
import TopCommonNav from '@/components/common/layouts/mobileLayout/TopCommonNav'
import ShopCard from '@/components/shop/ShopCard'
import { usePosition } from '@/state/hooks/usePosition'
import { useShopsInfinite } from '@/state/swr/shops/useShops'
import { CommonFSW } from '@/types/common'
import { PhoneIcon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
export default function OfflineSearch() {
  const { position } = usePosition()
  const [customPosition, setCustomPosition] = useState(position)
  const [distance, setDistance] = useState(1000)

  const [commonFSW, updateCommonFSW] = useImmer<CommonFSW>({ per_page: 4, sort: ['d.dis'] })

  const { data, isValidating, error, mutate, setSize, size } = useShopsInfinite(
    commonFSW,
    customPosition
      ? { distance, lat: customPosition.latitude, lng: customPosition.longitude }
      : undefined,
    customPosition ? false : true
  )
  console.log('flat전 데이터', size, data)
  const shopsData = data?.flatMap((data) => data.data)

  useEffect(() => {
    setCustomPosition(position)
  }, [position])

  console.log('shopsData', shopsData)

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
      <button
        onClick={() => {
          setSize(size + 1)
        }}
      >
        test
      </button>
      {shopsData ? (
        shopsData.map((shop, idx) => <ShopCard shop={shop} key={idx} />)
      ) : (
        <Box>No Data</Box>
      )}
    </MobileDefaultLayout>
  )
}
