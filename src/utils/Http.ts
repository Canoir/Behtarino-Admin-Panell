import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { Response } from '@typings/_Global';
import { TOKEN_COOKIE_KEY } from '@constants/cookies';
import { apiBaseURL } from '@constants/config';
import { getCookie } from 'typescript-cookie';
import qs from 'query-string';

class HttpClient {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeoutErrorMessage: 'تایم اوت'
    });
  }

  get = async <Type>(options: string | AxiosRequestConfig) => {
    const config = typeof options === 'string' ? { url: options } : options;
    return this.request<Type>({ method: 'GET', ...config });
  };

  post = <Type>(options: AxiosRequestConfig) => this.request<Type>({ method: 'POST', ...options });

  patch = <Type>(options: AxiosRequestConfig) =>
    this.request<Type>({ method: 'PATCH', ...options });

  put = <Type>(options: AxiosRequestConfig) => this.request<Type>({ method: 'PUT', ...options });

  delete = <Type>(options: AxiosRequestConfig) =>
    this.request<Type>({ method: 'DELETE', ...options });

  request = async <Type>(options: AxiosRequestConfig) => {
    const { url, method = 'GET', headers, data, params } = options;

    const token = getCookie(TOKEN_COOKIE_KEY);

    const _headers = {
      Accept: 'application/json',
      // #temp remove after backend devs added `Set-Cookie` header
      ...(token ? { Authorization: `Token ${token}` } : {}),
      ...headers
    };

    const response = await this.axiosInstance.request<Response<Type>>({
      method,
      url,
      baseURL: apiBaseURL,
      params,
      paramsSerializer: (param) => qs.stringify(param, { arrayFormat: 'none' }),
      ...(_headers ? { headers: _headers } : {}),
      ...(data ? { data } : {})
    });

    return response.data;
  };
}

const Http = new HttpClient();

export default Http;
