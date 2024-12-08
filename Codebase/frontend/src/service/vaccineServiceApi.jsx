import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import extractErrorMessage from '../util/extractErrorMessage';
import { getToken } from "../util/getToken";

const baseUrl = import.meta.env.VITE_API_URL;

export const vaccineApi = createApi({
    reducerPath: 'vaccineApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}vaccine`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ["vaccine"],
    endpoints: (builder) => ({
        getAllvaccine: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response) => {
                // Check if the response indicates success
                if (response.status === "success") {
                    return response.data.vaccines; // Return the vaccines array
                }
                return []; // Return an empty array if not successful
            },
            providesTags: ["vaccine"],
        }),
        addNewvaccine: builder.mutation({
            query: ({ farmId, ...data }) => ({
                url: `/${farmId}`, // Use farmId from the data parameter
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["vaccine"],
            transformErrorResponse: (response) => {
                const message = response?.data?.message || "Unknown error"; // Access error message
                return extractErrorMessage(message);
            },
        }),
    }),
});

export const { useGetAllvaccineQuery, useAddNewvaccineMutation } = vaccineApi;