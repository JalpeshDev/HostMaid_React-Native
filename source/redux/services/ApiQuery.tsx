import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkQueryApi = createApi({
    reducerPath: 'rtkQueryApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://emazdev.com/',
    }),

    endpoints: (builder) => ({
        getBookingByDate: builder.query({
            query: (date) => {
                return {
                    url: `api/bookings/${date}`,
                    method: 'GET'
                }
            }
        }),

        getBookingById: builder.query({
            query: (id) => {
                return {
                    url: `api/bookings/get/${id}`,
                    method: 'GET'
                }
            }
        }),

        postBookingTime: builder.mutation({
            query: (id) => {
                console.log("id ->: ", id)
                return {
                    url: `api/bookings/time/${id}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                }
            }
        }),
    }),

})

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
    useGetBookingByDateQuery,
    useGetBookingByIdQuery,
    usePostBookingTimeMutation
} = rtkQueryApi