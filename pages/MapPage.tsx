import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

const position = [51.505, -0.09] as [number, number];

const topWrapper = css`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

const mapWrapper = css`
  height: 100vh;
  flex-grow: 1;
`

const DynamicComponent = dynamic(() => import('../components/map'), {
  ssr: false,
  loading: () => <p>...</p>,
});

const ContentViewer = dynamic(() => import('../components/ContentViewer'), {
  ssr: false,
  loading: () => <p>...</p>,
});

const Page = () => {
  return (
    <div css={topWrapper}>
      <div css={mapWrapper}>
        <DynamicComponent />
      </div>
      <ContentViewer />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Page;
