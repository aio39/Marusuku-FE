import { Button, ButtonProps } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Drawer, DrawerContent, DrawerFooter, DrawerOverlay } from '@chakra-ui/react'
import React, { FC, useRef } from 'react'

const OpenDrawerBtn: FC<{ buttonProps: ButtonProps; text: string }> = ({
  buttonProps,
  text,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} {...buttonProps}>
        {text}
      </Button>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          {children}

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default OpenDrawerBtn
