import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type GetImagesResponse = {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  async function getImages({ pageParam = null }): Promise<GetImagesResponse> {
    const { data } = await api('/api/images', {
      params: {
        after: pageParam,
      },
    });
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: lastReq => {
      if (lastReq) {
        return lastReq.after
      } else {
        return null;
      }
    }
  });


  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(formattedData => {
      return formattedData.data.flat();
    });
    return formatted;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={[10, 15, 20]} mx="auto" my={[10, 15, 20]}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}