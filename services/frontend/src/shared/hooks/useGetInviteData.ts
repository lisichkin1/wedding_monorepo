import { useQuery } from '@tanstack/react-query';
import { weddingAPI } from '@shared/api';

export const useGetInviteData = ({ token }: { token?: string }) => {
  const { data: inviteData } = useQuery({
    queryKey: ['inviteData'],
    queryFn: () =>
      weddingAPI.getInvite({
        token: token
      }),
    meta: {
      errorHandling: 'global'
    },
    select: (response) => {
      return response?.data;
    }
  });

  return { inviteData };
};
