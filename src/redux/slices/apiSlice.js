import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    try {
      const raw = localStorage.getItem("userInfo");
      if (raw) {
        const user = JSON.parse(raw);
        if (user?.token) {
          headers.set("authorization", `Bearer ${user.token}`);
        }
      }
    } catch (e) {}
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
