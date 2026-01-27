import { useQuery } from '@tanstack/react-query';
import { factsAPI } from '@shared/api';
import { WelcomeImage } from '@shared/ui';

export const HomePage = () => {
  const { data: hierarchyData } = useQuery({
    queryKey: ['FFF'],
    queryFn: () => factsAPI.getHierarchy(),
    meta: {
      errorHandling: 'global'
    },
    select: (response) => {
      return response?.data;
    }
  });
  console.log(hierarchyData);
  return (
    <>
      <WelcomeImage />
    </>
  );
};
