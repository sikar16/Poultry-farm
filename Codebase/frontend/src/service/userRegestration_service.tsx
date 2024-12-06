import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import extractErrorMessage from '../util/extractErrorMessage';


// Define a service using a base URL and expected endpoints
export const userRegistrationServiceApi = createApi({
    reducerPath: 'userRegistrationServiceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5454/api/`,
        // prepareHeaders: async (headers) => {
        //     const token = await getToken();
        //     if (token) {
        //         headers.set("Authorization", `Bearer ${token}`);
        //     }
        //     return headers;
        // },
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getAlluser: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response) =>
                response.success ? response.data : [],
            providesTags: ["user"],
        }),
        addNewuser: builder.mutation({
            query: (data) => ({
                url: `/create`,
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

export const { useGetAlluserQuery, useAddNewuserMutation } = userRegistrationServiceApi;