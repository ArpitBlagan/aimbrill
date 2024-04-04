import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://localhost:4000";
export const tableApi = createApi({
  reducerPath: "table",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["data"],
  endpoints(builder) {
    return {
      getTables: builder.query<any, void>({
        query: () => {
          return {
            url: "/file",
          };
        },
        providesTags: ["data"],
      }),
      deleteTable: builder.mutation<any, string>({
        query: (id) => {
          return {
            url: `${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: [{ type: "data" }],
      }),
    };
  },
});
export const { useGetTablesQuery, useDeleteTableMutation } = tableApi;
