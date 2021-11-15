import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/hooks'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'

type P = {
  useDisclosureReturn: UseDisclosureReturn
  text: {
    title: string
    close: string
    confirm: string
  }
  href: string
}

const ModalWrapper: FC<P> = ({ useDisclosureReturn, text, href, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosureReturn
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{text.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {text.close}
            </Button>
            {href ? (
              <Link href={href}>
                <Button variant="ghost">{text.confirm}</Button>
              </Link>
            ) : (
              <Button variant="ghost">{text.confirm}</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalWrapper
