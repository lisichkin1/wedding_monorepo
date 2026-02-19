import { useQuery } from '@tanstack/react-query';
import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import { weddingAPI } from '@shared/api';
import { Calendar } from '@shared/ui/Calendar';
import s from './styles.module.scss';

export const Greeting = () => {
  const { token } = useParams<{ token: string }>();
  const { ref: refSubTitle, inView: inViewSubTitle } = useInView({
    threshold: 0.9
  });

  const { ref: refCalendar, inView: inViewCalendar } = useInView({
    threshold: 0.5
  });

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

  const getGreetingWord = () => {
    if (inviteData?.type === 'male') {
      return 'Дорогой';
    } else if (inviteData?.type === 'female') {
      return 'Дорогая';
    } else {
      return 'Дорогие';
    }
  };

  return (
    <div className={s.greeting}>
      <span className={s.mainTitle}>
        {getGreetingWord()} {inviteData?.name}
      </span>

      <span
        className={cn(s.subTitle, { [s.hidden]: !inViewSubTitle })}
        ref={refSubTitle}
      >
        В нашей жизни произойдет очень важное событие – наша свадьба! Мы верим и
        надеемся, что этот день станет красивым началом долгой и счастливой
        жизни.
      </span>

      <Calendar
        year={2026}
        month={3}
        ref={refCalendar}
        inView={inViewCalendar}
      />
    </div>
  );
};
