import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { SWRDevTools } from 'swr-devtools'
import theme from '../theme'
import './style.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <ChakraProvider resetCSS theme={theme}>
      <RecoilRoot>
        <SWRConfig>
          <SWRDevTools>
            <Component {...pageProps} />
          </SWRDevTools>
        </SWRConfig>
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default App
