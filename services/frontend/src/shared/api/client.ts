import axios, { type AxiosRequestConfig } from 'axios';

// Создаём экземпляр с нужными настройками
export const privateApiClientInstance = axios.create();

// Убрали перехватчик с трейсингом — он больше не нужен
// (оставлять пустые/неиспользуемые перехватчики не стоит)

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
    // Добавляем Content-Type, если не отправляем FormData
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

// Тип для обработки ошибок
export type ErrorType<Error> = import('axios').AxiosError<Error>;
