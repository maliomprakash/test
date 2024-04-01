import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiData = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65f7bfe1b4f842e80885efc4.mockapi.io/",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    dataOfApi: builder.query({
      query: () => "users",
      providesTags: ["Posts"],
    }),
    deleteData: builder.mutation({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Posts"],
    }),
    addData: builder.mutation({
      query: (newData) => ({
        url: `users`,
        method: "POST",
        body: newData,
        headers: { "Content-type": "application/json" }
      }),
      invalidatesTags: ["Posts"],
    }),
    updateData: builder.mutation({
      query: (newData) => ({
        url: `users/${newData.id}`,
        method: "PUT",
        body: newData,
        headers: { "Content-type": "application/json" },
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useDataOfApiQuery,
  useDeleteDataMutation,
  useAddDataMutation,
  useUpdateDataMutation,
} = apiData;