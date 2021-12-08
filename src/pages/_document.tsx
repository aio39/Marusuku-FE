import { ColorModeScript } from '@chakra-ui/color-mode'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'
import { SWRDevTools } from 'swr-devtools'
export default class AppDocument extends Document {
  // static async getInitialProps(ctx: any) {
  //   const page = await ctx.renderPage();
  //   const { css, ids } = await renderStatic(page.html);
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return {
  //     ...initialProps,
  //     styles: (
  //       <React.Fragment>
  //         {initialProps.styles}
  //         <style
  //           data-emotion={`css ${ids.join(' ')}`}
  //           dangerouslySetInnerHTML={{ __html: css }}
  //         />
  //       </React.Fragment>
  //     ),
  //   };
  // } //For Emotion

  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          /> */}
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap"
            rel="stylesheet"
          /> */}
          <link
            href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-jp.css"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <body>
          <SWRDevTools>
            <ColorModeScript />
            <Main />
          </SWRDevTools>
          <NextScript />
        </body>
      </Html>
    )
  }
}
