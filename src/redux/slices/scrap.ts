import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IArticle} from '../../types';
import {Dispatch} from 'redux';

const loadInitialScraps = async () => {
  /* 로컬스토리지 데이터 */
  try {
    const scrapsJson = await AsyncStorage.getItem('scraps');
    return scrapsJson ? JSON.parse(scrapsJson) : [];
  } catch (error) {
    console.error(
      '로컬 스토리지에서 초기 스크랩 데이터를 불러오는 중 에러 발생:',
      error,
    );
    return [];
  }
};

const scrapsSlice = createSlice({
  name: 'scraps',
  initialState: {
    scraps: [] as IArticle[],
  },
  reducers: {
    toggleScrap: (state, action: PayloadAction<IArticle>) => {
      const item = action.payload;
      const isScrapped = state.scraps.some(
        scrapItem => scrapItem._id === item._id,
      );

      if (isScrapped) {
        state.scraps = state.scraps.filter(
          scrapItem => scrapItem._id !== item._id,
        );
      } else {
        state.scraps.push(item);
      }

      /* 로컬 스토리지에 저장 */
      AsyncStorage.setItem('scraps', JSON.stringify(state.scraps)).catch(
        error => {
          console.error('AsyncStorage에 스크랩 저장 중 에러 발생:', error);
        },
      );
    },
    loadScraps: (state, action) => {
      state.scraps = action.payload;
    },
  },
});

export const {toggleScrap, loadScraps} = scrapsSlice.actions;

export default scrapsSlice;

export const initializeScraps = () => {
  return async (dispatch: Dispatch) => {
    const initialScraps = await loadInitialScraps();
    dispatch(loadScraps(initialScraps));
  };
};
