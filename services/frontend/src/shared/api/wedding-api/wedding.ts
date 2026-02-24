import { privateApiClient } from '../client';

export type TConfirmStatus = 'attending' | 'declined' | 'pending' | '';

export interface InviteType {
  confirmed?: TConfirmStatus;
  created_at?: string;
  name?: string;
  token?: string;
  type: 'male' | 'female' | 'group';
}

export const getInvite = async ({ token }: { token?: string }) =>
  await privateApiClient<DataRes<InviteType>>({
    url: `/api/guests/${token}`
  });

export const confirmInvite = async ({
  token,
  status
}: {
  token: string;
  status: TConfirmStatus;
}) =>
  await privateApiClient({
    url: `/api/guests/confirm/${token}`,
    method: 'POST',
    data: {
      response: status
    }
  });
