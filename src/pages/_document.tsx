import { ColorModeScript } from '@chakra-ui/color-mode';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
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
        <Head />
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
