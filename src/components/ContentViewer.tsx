import { css } from '@emotion/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  positionState,
  recentGeoCodeState,
  shopListState,
} from '../state/recoil/tempAtoms';
import AddressSearch from './AddressSearch';

const wrapper = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #eee;
  flex-grow: 1;
  max-width: 30vw;
  min-width: 300px;
  padding: 1rem 3rem;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  * {
    margin-bottom: 1rem;
  }
`;

type Inputs = {
  name: string;
  address: string;
};

const ContentViewer = () => {
  const position = useRecoilValue(positionState);
  const recentPosition = useRecoilValue(recentGeoCodeState);

  const [shops, setShops] = useRecoilState(shopListState);
  const { register, handleSubmit, watch } = useForm<Inputs>({});

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setShops((p) => [...p, { geoCode: position, ...data }]);
  };

  return (
    <div css={wrapper}>
      <h1>정보 </h1>
      <div>
        {position?.lat}
        {position?.lng}
      </div>
      <div>
        <span>{recentPosition?.lat}</span>
        <span>{recentPosition?.lng}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} css={formStyle}>
        <input type="text" {...register('name', { maxLength: 20 })} />
        <input type="text" {...register('address')} />
        {/* <input type="number" {...register('age', { min: 18, max: 99 })} /> */}
        <button type="submit">제출하기</button>
      </form>
      <AddressSearch />
    </div>
  );
};

export default ContentViewer;
