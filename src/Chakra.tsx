// e.g. src/Chakra.js
// a) import `ChakraProvider` component as well as the storageManagers
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import theme from './theme'

const Chakra = ({ cookies, children }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // b) Pass `colorModeManager` prop
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager

  return (
    <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}

export default Chakra

// also export a reusable function getServerSideProps
const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  }
}
