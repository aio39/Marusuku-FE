import useSWR from 'swr';
import { NEWS, Place } from '../../types/Place';
import { axiosI } from '../fetcher';

const URL_Place = '/api/places';

const fetcher = (url: string, news: NEWS) => {
  console.log(news, '페쳐');
  return axiosI
    .get(url, { params: news })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err, '에러데이터');
      throw new Error('An error occurred while fetching the data.');
    });
};

const usePlaces = (news?: NEWS) => {
  const { data, error, mutate } = useSWR<Place[]>(
    news ? [URL_Place, news] : null,
    fetcher
  );
  console.log(data);
  console.log('usePlaces의 error', error);
  return { data, error, mutate };
};

export { usePlaces };
