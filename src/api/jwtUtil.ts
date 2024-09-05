// import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { getCookie } from "util/cookie";

// // 빈 설정 객체를 전달하여 axios 인스턴스를 생성합니다.
// export const jwtAxios = axios.create({});

// // 요청 인터셉터를 설정합니다.
// const beforeReq = (
//   config: AxiosRequestConfig,
// ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
//   const accessToken = getCookie("accessToken");
//   if (!accessToken) {
//     return Promise.reject({
//       response: { data: { error: "로그인 하셔서 인증받으세요." } },
//     });
//   }
//   config.headers = {
//     ...config.headers,
//     Authorization: `Bearer ${accessToken}`,
//   };
//   return config;
// };

// // 요청 실패 시 처리합니다.
// const failReq = (error: AxiosError): Promise<AxiosError> => {
//   return Promise.reject(error);
// };

// // 요청과 응답 인터셉터를 추가합니다.
// jwtAxios.interceptors.request.use(beforeReq, failReq);
