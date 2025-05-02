// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // const cryptoNewsHeaders = {
// //     'x-rapidapi-key': 'b8619544bcmsh8ca0117ccb9c899p109e12jsn1c7428b35aac',
// //     'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com'
// // };

// // const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

// // const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// // export const cryptoNewsApi = createApi({
// //     reducerPath: 'cryptoNewsApi',
// //     baseQuery: fetchBaseQuery({ baseUrl }),
// //     endpoints: (builder) => ({
// //         getCryptoNews: builder.query({
// //             query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
// //         }),
// //     }),
// // });

// // export const { useGetCryptoNewsQuery } = cryptoNewsApi;




// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Try the more current Bing News API structure
// const cryptoNewsHeaders = {
//     'x-rapidapi-key': 'b8619544bcmsh8ca0117ccb9c899p109e12jsn1c7428b35aac',
//     'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com'
// };

// const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

// // Create a mock response function as fallback
// const mockNewsData = (newsCategory, count) => {
//     return {
//         value: Array(count).fill().map((_, i) => ({
//             name: `${newsCategory} News Article ${i+1}`,
//             url: 'https://example.com',
//             description: `This is a mock description for a ${newsCategory} news article. The actual API appears to be unavailable.`,
//             datePublished: new Date().toISOString(),
//             image: { thumbnail: { contentUrl: null } },
//             provider: [{ name: 'Mock Provider', image: { thumbnail: { contentUrl: null } } }]
//         }))
//     };
// };

// export const cryptoNewsApi = createApi({
//     reducerPath: 'cryptoNewsApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     endpoints: (builder) => ({
//         getCryptoNews: builder.query({
//             query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
//             // Add transformResponse to handle errors and provide mock data if needed
//             transformResponse: (response, meta, arg) => {
//                 // If we received valid data, return it
//                 if (response?.value) return response;
                
//                 // Otherwise return mock data
//                 console.log("Using mock data as the API returned an error");
//                 return mockNewsData(arg.newsCategory, arg.count);
//             },
//             // Add transformErrorResponse to provide mock data on error
//             transformErrorResponse: (response, meta, arg) => {
//                 console.log("API Error:", response);
//                 return mockNewsData(arg.newsCategory, arg.count);
//             }
//         }),
//     }),
// });

// const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// export const { useGetCryptoNewsQuery } = cryptoNewsApi;






import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// GNews API key and configuration
const gnewsApiKey = 'a9199b53bdc2cf3570d04c78396d2276'; // Your GNews API key
const baseUrl = 'https://gnews.io/api/v4';

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => `/search?q=${newsCategory}&max=${count}&apikey=${gnewsApiKey}&lang=en`,
            transformResponse: (response) => {
                // Transform GNews response format to match the expected format in your application
                return {
                    value: response.articles.map(article => ({
                        name: article.title,
                        url: article.url,
                        description: article.description,
                        datePublished: article.publishedAt,
                        image: { 
                            thumbnail: { 
                                contentUrl: article.image 
                            } 
                        },
                        provider: [{ 
                            name: article.source.name, 
                            image: { 
                                thumbnail: { 
                                    contentUrl: null 
                                } 
                            } 
                        }]
                    }))
                };
            },
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;