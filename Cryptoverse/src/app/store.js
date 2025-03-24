// import { configureStore } from '@reduxjs/toolkit';

// import { cryptoApi } from '../services/cryptoApi';
// import { cryptoNewsApi } from '../services/cryptoNewsApi';

// export default configureStore({
//   reducer: {
//     [cryptoApi.reducerPath]: cryptoApi.reducer,
//     [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

export default store;

