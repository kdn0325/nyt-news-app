import {StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import NewListItem from '../../components/NewListItem/NewListItem';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootState} from '../../redux/store/reducer';

import {IArticle} from '../../types';
import {useAppDispatch} from '../../redux/store';
import {initializeScraps} from '../../redux/slices/scrap';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from '@reduxjs/toolkit';
import Nodata from '../../components/Nodata/Nodata';

/* 스크랩된 기사만 출력 */

const Bookmark = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useAppDispatch();
  const scraps = useSelector((state: RootState) => state.scraps.scraps);

  /* 껏다 켜도 스크랩된 데이터는 남게 asyncStorage에 초기값 불러오기 */

  useEffect(() => {
    dispatch(initializeScraps());
  }, [dispatch]);

  const scrapItem = useCallback(({item}: {item: IArticle}) => {
    return <NewListItem item={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {scraps.length > 0 ? (
        <FlatList
          data={scraps}
          keyExtractor={item => item._id}
          renderItem={scrapItem}
        />
      ) : (
        <Nodata />
      )}
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
