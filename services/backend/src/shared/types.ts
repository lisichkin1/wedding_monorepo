export type GuestResponse = 'attending' | 'declined' | 'pending' | '';

export interface Guest {
  token: string;
  name: string;
  confirmed: GuestResponse;
  created_at: string;
  type: 'male' | 'female' | 'group';
}

export interface GuestCreateInput {
  name: string;
  type: 'male' | 'female' | 'group';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
