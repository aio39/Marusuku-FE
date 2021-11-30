import Chakra from '@/Chakra'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement, ReactNode, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig, useSWRConfig } from 'swr'
import { SWRDevTools } from 'swr-devtools'
import { SWRDevToolPanel } from 'swr-devtools-panel'
import theme from '../theme'
import './style.css'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import { AnimateSharedLayout } from 'framer-motion'
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

  // useEffect(() => {
  //   window.Pusher = require('pusher-js')
  //   const echo = new Echo({
  //     broadcaster: 'pusher',
  //     key: 'local',
  //     wsHost: '127.0.0.1', //window.location.hostname
  //     wsPort: 6001,
  //     // cluster: 'mt1',
  //     forceTLS: false, // SSL 쓴다면 설정해야함.
  //     disableStates: true,
  //     // authEndpoint: '/broadcast/auth ', 기본 엔드포인트 인증증
  //   })

  //   // echo.channel('name').listen('.Nmaespace\\Event\\Class')

  //   // echo.private('order.${orderId}').listen('QRCodeUsed', (e: any) => {
  //   //   console.log(e.update)
  //   //   console.log(e)
  //   // })

  //   echo.channel('test').listen('Hello', (e: any) => {
  //     console.log(e)
  //   })
  //   // .listen('Event2', (e: any) => {
  //   //   console.log(e)
  //   // })

  //   // echo.leaveChannel('name')
  //   // echo.leave('name') 연관된 비공개 현재 채널도 나감. ??
  // }, [])

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
