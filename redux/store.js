
// import { combineReducers } from "redux";
// import loginSlice from "./loginSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import { configureStore } from "@reduxjs/toolkit";

// const reducers = combineReducers({
//   login: loginSlice,
// });

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);
// const store = configureStore({ reducer: persistedReducer });
// const persistor = persistStore(store);
// export { store, persistor };
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

import authReducer from '../reducers/authReducer';

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
  stateReconciler: autoMergeLevel2
//   whitelist: ['bookmarks']
};

const rootReducer = combineReducers({
    // activityReducer: persistReducer(persistConfig, activityReducer),
    userState: authReducer//persistReducer(persistConfig, authReducer)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);