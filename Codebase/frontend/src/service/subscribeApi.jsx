import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import extractErrorMessage from '../util/extractErrorMessage';
import { getToken } from "../util/getToken"
const baseUrl = import.meta.env.VITE_API_URL;

export const ServiceApi = createApi({
    reducerPath: 'ServiceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ["Service"],
    endpoints: (builder) => ({
        getAllService: builder.query({
            query: () => ({
                url: 'subscription',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response) =>
                response.success ? response : response,

            providesTags: ["Service"],
        }),

    }),
});

export const { useGetAllServiceQuery } = ServiceApi;