import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500/'}),
   tagTypes: ['Note, User'],
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => 'notes',
            providesTags: ['Note'],
        }),
        getNote: builder.query({
            query: (id) => `notes/${id}`,
            providesTags: ['Note'],
        }),
        addNote: builder.mutation({
            query: (note) => ({
                url: 'notes',
                method: 'POST',
                body: note,
            }),
            invalidatesTags: ['Note'],
        }),
        updateNote: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `notes/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Note'],
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Note'],
        }),
        getUser: builder.query({
            query: (id) => `users/${id}`,
            providesTags: ['User'],
        }),
    }),
});
