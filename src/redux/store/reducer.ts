import {combineReducers} from 'redux';

import articlesSlice from '../slices/articles';
import scrapsSlice from '../slices/scrap';

const rootReducer = combineReducers({
  articles: articlesSlice.reducer,
  scraps: scrapsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
