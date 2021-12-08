import { CommonFSW } from '@/types/common'
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputRightElement } from '@chakra-ui/input'
import { Button, InputGroup } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { Updater } from 'use-immer'

interface ISearchInput {
  update: Updater<CommonFSW>
}

const SearchInput: FC<ISearchInput> = ({ update }) => {
  const [value, setValue] = useState('')

  const handleUpdate = () => {
    if (value === '') return
    setTimeout(() => {
      update((draft) => {
        console.log(draft)
      })
    }, 0)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setValue(event.target.value)

  const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      console.log('enter')
      handleUpdate()
    }
  }

  return (
    <InputGroup>
      <InputRightElement pointerEvents="none" mr="4px">
        <Button h="1.75rem" size="sm" onClick={handleUpdate}>
          <SearchIcon color="gray.300" />
        </Button>
      </InputRightElement>
      <Input
        value={value}
        onChange={handleChange}
        onKeyDown={handleEnter}
        placeholder="가게 검색"
      />
    </InputGroup>
  )
}

export default SearchInput
