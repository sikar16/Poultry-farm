import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userRegistrationServiceApi } from '../service/userRegestration_service';

export const store = configureStore({
    reducer: {
        [userRegistrationServiceApi.reducerPath]: userRegistrationServiceApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userRegistrationServiceApi.middleware,
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;