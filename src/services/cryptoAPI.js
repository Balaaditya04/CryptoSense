import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Debugging: Log API keys to check if .env variables are loading
console.log("API Key:", process.env.REACT_APP_RAPIDAPI_KEY);
console.log("API Host:", process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST);

const cryptoApiHeaders = {
    "x-rapidapi-host": process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST || "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY || "b8619544bcmsh8ca0117ccb9c899p109e12jsn1c7428b35aac",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`),
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        }),
    }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } = cryptoApi;
