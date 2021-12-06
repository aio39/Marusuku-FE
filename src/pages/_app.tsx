import Chakra from '@/Chakra'
import { AnimateSharedLayout } from 'framer-motion'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement, ReactNode, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig, useSWRConfig } from 'swr'
import { SWRDevTools } from 'swr-devtools'
import { SWRDevToolPanel } from 'swr-devtools-panel'
import './style.css'
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

declare global {
  interface Window {
    Pusher: any
  }
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

  useEffect(() => {
    window.Pusher = require('pusher-js')
  }, [])

  return (
    <SWRConfig>
      <SWRDevTools>
        <Chakra cookies={pageProps.cookies}>
          <RecoilRoot>
            <AnimateSharedLayout>
              <Component {...pageProps} />
            </AnimateSharedLayout>
            {/* <DevToolsArea /> */}
          </RecoilRoot>
        </Chakra>
      </SWRDevTools>
    </SWRConfig>
  )
}

export default App
