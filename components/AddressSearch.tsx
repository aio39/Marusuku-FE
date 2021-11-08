import { AxiosRequestConfig } from 'axios';
import { FC, Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { axiosI } from '../state/fetcher';

type Inputs = {
  address: string;
};

const API_KEY = 'AIzaSyC4DlxUnTj9xDz4vQE9aaZGatarQ1-fnuw';

const URL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${API_KEY}`;

const config: AxiosRequestConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
};

const AddressSearch: FC = (params) => {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axiosI
      .get(URL, config)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <Fragment>
      <h1>장소 검색</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('address', { required: true })} />
        <button type="submit">장소 검색</button>
      </form>
    </Fragment>
  );
};

export default AddressSearch;
