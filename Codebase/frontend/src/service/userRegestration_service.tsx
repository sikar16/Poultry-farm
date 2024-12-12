import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import extractErrorMessage from '../util/extractErrorMessage';
import { getToken } from "../util/getToken"
const baseUrl = import.meta.env.VITE_API_URL;

export const userRegistrationServiceApi = createApi({
    reducerPath: 'userRegistrationServiceApi',
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

    tagTypes: ["user"],
    endpoints: (builder) => ({
        getAlluser: builder.query({
            query: () => ({
                url: 'user/admin',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response) =>
                response.success ? response.data : response.data,
            providesTags: ["user"],
        }),
        addNewuser: builder.mutation({
            query: (data) => ({
                url: 'user/signup',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["user"],
            transformErrorResponse: (response) => {
                const message = response?.data?.message || "Unknown error";
                return extractErrorMessage(message);
            },
        }),
    }),
});

export const { useAddNewuserMutation, useGetAlluserQuery } = userRegistrationServiceApi;