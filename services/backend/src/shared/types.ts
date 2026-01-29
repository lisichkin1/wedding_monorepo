export interface Guest {
  token: string;
  name: string;
  confirmed: boolean;
  created_at: string;
}

export interface GuestCreateInput {
  name: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
