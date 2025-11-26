import { useQuery } from '@tanstack/react-query';
import { factsAPI } from '@shared/api';

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
      <div style={{ padding: 25, display: 'flex', gap: '6px' }}>
        <span>fedfwefw</span> <p>fedfwefw</p>
        <p>fedfwefw</p>
        <p>fedfwefw</p>
        <p>fedfwefw</p>
        <p>fedfwefw</p>
      </div>
    </>
  );
};
