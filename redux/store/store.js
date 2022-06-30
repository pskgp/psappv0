import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

import authReducer from '../reducers/authReducer';
import activityReducer from '../reducers/reducer'
const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
  // stateReconciler: autoMergeLevel2
//   whitelist: ['bookmarks']
};

const rootReducer = combineReducers({
  activityReducer: activityReducer,
  userState: authReducer
});
// use this for redux persist 
// const rootReducer = combineReducers({
//     activityReducer: persistReducer(persistConfig, activityReducer),
//     userState: persistReducer(persistConfig, authReducer)
// });

export const store = createStore(rootReducer, applyMiddleware(thunk));

// use this with redux persist
// export const persistor = persistStore(store);