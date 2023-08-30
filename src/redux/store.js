import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userRedux from "./userRedux";
import productRedux from "./productRedux";
import newsRedux from "./newsRedux";


const persistConfig = {
  key: "root",
  version: 1,
  storage ,
};

const rootReducer = combineReducers({
  admin: userRedux,
  product: productRedux,
  news: newsRedux

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
 
    }),
});

export let persistor = persistStore(store);
