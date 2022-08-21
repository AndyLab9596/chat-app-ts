import axios, { AxiosError, AxiosResponse } from "axios";

// console.log(localStorage.getItem('token'))
const axiosClient = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${localStorage.getItem('token')}`
  },
});

// // Add a request interceptor
// axiosClient.interceptors.request.use(
//   function (config: AxiosRequestConfig) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // HTTP code
    

    return Promise.reject(error);
  }
);

export default axiosClient;
