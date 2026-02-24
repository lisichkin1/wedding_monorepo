import axios, { type AxiosRequestConfig } from 'axios';

export const privateApiClientInstance = axios.create();

/**
 * Универсальный приватный API-клиент
 */
export const privateApiClient = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const isFormData = config.data instanceof FormData;

  const headers = {
    ...options?.headers,

    ...(isFormData ? {} : { 'Content-Type': 'application/json' })
  };

  const requestConfig = {
    ...config,
    ...options,
    headers: headers
  };

  const response = await privateApiClientInstance.request<T>(requestConfig);
  return response.data;
};

export type ErrorType<Error> = import('axios').AxiosError<Error>;
