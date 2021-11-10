import useSWR from 'swr';
import { NEWS, Place } from '../../types/Place';
import { axiosI } from '../fetcher';
import laggy from './middleware/laggy';

const URL_Place = '/api/places';

const fetcher = (url: string, ...rest: number[]) => {
  const news = {
    b: rest[0],
    l: rest[1],
    r: rest[2],
    t: rest[3],
  };
  return axiosI
    .get(url, { params: news })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err, '에러데이터');
      throw new Error('An error occurred while fetching the data.');
    });
};

const usePlaces = (news?: NEWS) => {
  const swrResponses = useSWR<Place[]>(
    () => {
      if (!news) {
        return null;
      } else {
        const { b, l, r, t } = news;
        return [URL_Place, b, l, r, t];
      }
    },
    fetcher,
    {
      use: [laggy],
    }
  );
  const { data, error } = swrResponses;
  return swrResponses;
};

export { usePlaces };
