import {FlatList, StyleSheet, SafeAreaView} from 'react-native';
import React, {useCallback, useEffect} from 'react';


import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../redux/store';
import {RootState} from '../../redux/store/reducer';
import {fetchDataAsync, setPage} from '../../redux/slices/articles';
import NewListItem from '../../components/NewListItem/NewListItem';
import {IArticle} from '../../types';

import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from '@reduxjs/toolkit';
import Header from '../../components/Header/Header';

const Home = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useAppDispatch();

  const data = useSelector((state: RootState) => state.articles.data);
  const loading = useSelector((state: RootState) => state.articles.loading);
  const headline = useSelector((state: RootState) => state.articles.headline);
  const period = useSelector((state: RootState) => state.articles.period);
  const page = useSelector((state: RootState) => state.articles.page);

  const glocations = useSelector(
    (state: RootState) => state.articles.glocations,
  );

  const fetchData = useCallback(
    (nextPage: number) => {
      dispatch(setPage(nextPage));

      dispatch(
        fetchDataAsync({
          headline,
          period,
          glocations,
          page: nextPage,
        }),
      );
    },
    [dispatch, headline, period, glocations],
  );

  /* New York Times API 호출 */
  useEffect(() => {
    fetchData(1);
  }, []);

  /* 무한 스크롤 */
  const handleEndReached = () => {
    const nextPage = page + 1;
    fetchData(nextPage);
  };

  const newsItem = useCallback(({item}: {item: IArticle}) => {
    return <NewListItem item={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={(value, index) => String(index)}
        renderItem={newsItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        style={styles.itemList}
        extraData={{data, loading, headline, period, glocations}}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flatContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 20,

    height: 104,
  },
  headlineContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    flex: 2,
    alignItems: 'flex-start',
  },
  bottomContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemList: {
    padding: 20,
    backgroundColor: '#F0F1F4',
  },

  headline: {
    fontSize: 18,
    flex: 2,
    fontWeight: '600',
  },
  star: {
    width: 16,
    height: 16,
  },
  byline: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400',
  },
  data: {
    fontSize: 13,

    fontWeight: '400',
    color: '#6D6D6D',
  },
  source: {
    fontSize: 13,

    fontWeight: '400',
  },
});
