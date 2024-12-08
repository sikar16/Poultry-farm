import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../util/getToken";
const baseUrl = import.meta.env.VITE_API_URL;


export const loginApi = createApi({
    reducerPath: "loginApi",
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
        loginUser: builder.mutation({
            query: (loginData) => ({
                url: `/user/login`,
                method: "POST",
                body: loginData,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer token",
                },
            }),
            transformResponse: (response) => {
                return response;
            },
            transformErrorResponse: (response) => {
                return response.data;
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
} = loginApi;