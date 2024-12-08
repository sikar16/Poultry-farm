import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userRegistrationServiceApi } from '../service/userRegestration_service';
import { loginApi } from '../service/loginApi';
import { ServiceApi } from '../service/subscribeApi';
import { farmDataFormApi } from '../service/FarmDataFormApi';
import { vaccineApi } from '../service/vaccineServiceApi';

export const store = configureStore({
    reducer: {
        [userRegistrationServiceApi.reducerPath]: userRegistrationServiceApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [ServiceApi.reducerPath]: ServiceApi.reducer,
        [farmDataFormApi.reducerPath]: farmDataFormApi.reducer,
        [vaccineApi.reducerPath]: vaccineApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userRegistrationServiceApi.middleware,
            loginApi.middleware,
            ServiceApi.middleware,
            farmDataFormApi.middleware,
            vaccineApi.middleware,
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;