import cn from 'classnames';
import { useTimer } from '@shared/hooks';
import s from './styles.module.scss';

interface TimerProps {
  isView?: boolean;
}

export const Timer = ({ isView }: TimerProps) => {
  const { days, hours, minutes, seconds } = useTimer();
  console.log(days, hours, minutes, seconds);
  console.log(
    100 - (100 / 365) * days,
    100 - (100 / 60) * hours,
    100 - (100 / 60) * minutes,
    100 - (100 / 60) * seconds
  );
  return (
    <div className={cn(s.timer, { [s.timerView]: !isView })}>
      <div
        className={s.day}
        style={{
          background: `conic-gradient(#fff ${100 - (100 / 365) * days}%, transparent 0)`
        }}
      ></div>
      <div
        className={s.day}
        style={{
          background: `conic-gradient(#fff ${(100 / 24) * hours}%, transparent 0)`
        }}
      ></div>
      <div
        className={s.day}
        style={{
          background: `conic-gradient(#fff ${(100 / 60) * minutes}%, transparent 0)`
        }}
      ></div>
      <div
        className={s.day}
        style={{
          background: `conic-gradient(#fff ${100 - (100 / 60) * seconds}%, transparent 0)`
        }}
      ></div>
      <div className={s.timerCount}>
        <div className={s.countContainer}>
          <span className={s.countTitle}>{days}</span>
          <span className={s.countSubtitle}>Дней</span>
        </div>
        <div className={s.countContainer}>
          <span className={s.countTitle}>{hours}</span>
          <span className={s.countSubtitle}>Часов</span>
        </div>
        <div className={s.countContainer}>
          <span className={s.countTitle}>{minutes}</span>
          <span className={s.countSubtitle}>Минут</span>
        </div>
        <div className={s.countContainer}>
          <span className={s.countTitle}>{seconds}</span>
          <span className={s.countSubtitle}>Секунд</span>
        </div>
      </div>
    </div>
  );
};
