import axios from "axios";
import { getCookie } from "util/cookie";

// export const jwtAxios = axios.create();

// const beforeReq = (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
//     let accessToken = getCookie("accessToken");
//     if (!accessToken) {
//       return Promise.reject({
//         response: { data: { error: "Login 하셔서 인증받으세요." } },
//       });
//     }
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
//   };

//   const failReq = (error: AxiosError): Promise<AxiosError> => {
//     return Promise.reject(error);
//   };

//   jwtAxios.interceptors.request.use(beforeReq, failReq);
