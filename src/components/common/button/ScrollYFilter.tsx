import { CommonFSW } from '@/types/common'
import { Button } from '@chakra-ui/button'
import { Flex } from '@chakra-ui/layout'
import { FC, MouseEventHandler } from 'react'
import { MdOutlineSettingsInputSvideo } from 'react-icons/md'
import { Updater } from 'use-immer'

interface IFilterButton {
  text: string
  icon?: JSX.Element
  onClick?: MouseEventHandler<HTMLButtonElement>
  sort?: string
}

const FilterButton: FC<IFilterButton> = ({ text, icon, onClick, sort }) => {
  return (
    <Button flexShrink="0" leftIcon={icon} onClick={onClick} data-sort={sort}>
      {text}
    </Button>
  )
}

const ScrollYFilter: FC = ({ children }) => {
  return (
    <Flex
      className="scrollbar-hidden"
      overflowX="scroll"
      width="auto"
      maxW="100vw"
      flexWrap="nowrap"
      py="8px"
      sx={{ 'button:not(:last-child)': { marginRight: '8px' } }}
    >
      {children}
    </Flex>
  )
}

const ScrollYFilterForShop: FC<{
  commonFSW: CommonFSW
  updateCommonFSW: Updater<CommonFSW>
}> = ({ commonFSW, updateCommonFSW }) => {
  const sortHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const sort = e.currentTarget.getAttribute('data-sort')
    if (sort) {
      updateCommonFSW((draft) => {
        if (sort) {
          draft.sort = [sort]
        } else {
          draft.sort = []
        }
      })
    }
  }

  return (
    <ScrollYFilter>
      <FilterButton
        text="거리순"
        sort="d.dis"
        onClick={sortHandler}
        icon={MdOutlineSettingsInputSvideo({})}
      />
      <FilterButton
        text="새로운 가게"
        onClick={sortHandler}
        sort="updated_at"
        icon={MdOutlineSettingsInputSvideo({})}
      />
      <FilterButton
        text="이름"
        onClick={sortHandler}
        sort="name"
        icon={MdOutlineSettingsInputSvideo({})}
      />

      <FilterButton text="버튼" icon={MdOutlineSettingsInputSvideo({})} />
      <FilterButton text="버튼" icon={MdOutlineSettingsInputSvideo({})} />
      <FilterButton text="버튼" icon={MdOutlineSettingsInputSvideo({})} />
    </ScrollYFilter>
  )
}

export default ScrollYFilter
export { ScrollYFilterForShop }
