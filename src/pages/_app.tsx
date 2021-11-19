import Chakra from '@/Chakra'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig, useSWRConfig } from 'swr'
import { SWRDevTools } from 'swr-devtools'
import { SWRDevToolPanel } from 'swr-devtools-panel'
import theme from '../theme'
import './style.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const DevToolsArea = () => {
  const { cache } = useSWRConfig()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '400px',
      }}
    >
      <SWRDevToolPanel cache={cache} />
    </div>
  )
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // const getLayout = Component.getLayout || ((page) => page)

  return (
    <SWRConfig>
      <SWRDevTools>
        <Chakra cookies={pageProps.cookies}>
          <RecoilRoot>
            <Component {...pageProps} />
            {/* <DevToolsArea /> */}
          </RecoilRoot>
        </Chakra>
      </SWRDevTools>
    </SWRConfig>
  )
}

export default App
