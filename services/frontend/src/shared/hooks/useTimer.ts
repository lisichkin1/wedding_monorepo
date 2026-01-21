import moment from 'moment';
import { useEffect, useState } from 'react';
import 'moment-timezone';
import { TIME } from '@shared/constants';

export const useTimer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = () => {
      const futureDate = moment.tz(TIME, 'Europe/Saratov');

      // Текущее локальное время пользователя
      const now = moment();

      // Разница в секундах
      const diff = futureDate.diff(now, 'seconds');

      if (diff > 0) {
        const daysRemaining = Math.floor(diff / 86400);
        const hoursRemaining = Math.floor((diff % 86400) / 3600);
        const minutesRemaining = Math.floor((diff % 3600) / 60);
        const secondsRemaining = Math.floor(diff % 60);

        setDays(daysRemaining);
        setHours(hoursRemaining);
        setMinutes(minutesRemaining);
        setSeconds(secondsRemaining);
      } else {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    const interval = setInterval(timer, 1000);
    timer();

    return () => clearInterval(interval);
  }, []);

  return { days, hours, minutes, seconds };
};
