import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import extractErrorMessage from '../util/extractErrorMessage';
import { getToken } from "../util/getToken"
const baseUrl = import.meta.env.VITE_API_URL;

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}user`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ["admin"],
    endpoints: (builder) => ({

        addNewFarmdata: builder.mutation({
            query: (data) => ({
                url: '/farm',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["farmData"],
            transformErrorResponse: (response) => {
                const message = response?.data.data;
                return extractErrorMessage(message);
            },
        }),
    }),
});

export const { useAddNewFarmdataMutation } = adminApi;