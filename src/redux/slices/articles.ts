import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';
import {IArticle} from '../../types';

type PayloadType = {
  headline: string;
  period: string;
  glocations: string[] | null;
  page: number;
};

export const fetchDataAsync = createAsyncThunk<IArticle[], PayloadType>(
  'data/fetchData',
  async payload => {
    try {
      const {headline, period, glocations, page} = payload;

      const apiKey = `${Config.API_KEY}`;

      const baseUrl =
        'https://api.nytimes.com/svc/search/v2/articlesearch.json';

      const fqParts = [];

      if (headline) {
        fqParts.push(`headline:("${headline}")`);
      }

      if (period) {
        fqParts.push(`pub_date:("${period}")`);
      }

      if (glocations && glocations.length > 0) {
        const glocationsFormat = glocations.map(value => `"${value}"`);
        fqParts.push(`glocations=${glocationsFormat.join(',')}`);
      }

      const fqQuery = fqParts.length > 0 ? `fq=${fqParts.join('AND')}` : '';

      /* 쿼리스트링 수정 */
      const url = `${baseUrl}?sort=newest&api-key=${apiKey}&page=${page}${
        fqQuery ? `&${fqQuery}` : ''
      }`;

      const response = await axios.get(url);

      const articles = response.data.response.docs;

      if (articles.length === 0) {
        throw new Error('검색 결과가 없습니다');
      }

      return articles;
    } catch (error) {
      throw error;
    }
  },
);

const dataSlice = createSlice({
  name: 'article',
  initialState: {
    data: [] as IArticle[],
    loading: false,
    headline: '',

    period: '',
    glocations: [],
    page: 1,
  },
  reducers: {
    setHeadline: (state, action) => {
      state.headline = action.payload;
    },
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
    setGlocations: (state, action) => {
      state.glocations = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetData: state => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDataAsync.pending, state => {
        state.loading = true;
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload];
      })
      .addCase(fetchDataAsync.rejected, (state, action) => {
        state.loading = false;
        console.error('Error fetching data:', action.error.message);
      });
  },
});

export const {setHeadline, setPeriod, setGlocations, setPage, resetData} =
  dataSlice.actions;
export default dataSlice;
