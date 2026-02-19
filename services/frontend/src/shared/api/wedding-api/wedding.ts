import { privateApiClient } from '../client';

export interface InviteType {
  confimed?: boolean;
  created_at?: string;
  name?: string;
  token?: string;
  type: 'male' | 'female' | 'group';
}

export const getInvite = async ({ token }: { token?: string }) =>
  await privateApiClient<DataRes<InviteType>>({
    url: `/api/guests/${token}`
  });
