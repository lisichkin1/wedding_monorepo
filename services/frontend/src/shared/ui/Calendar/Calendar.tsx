import cn from 'classnames';
import { forwardRef, useMemo } from 'react';
import { Icon } from '../Icon';
import s from './styles.module.scss';

interface CalendarProps {
  year: number;
  month: number; // 0-11 (январь - декабрь)
  inView?: boolean;
  ref?: () => void;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ year, month, inView }, ref) => {
    const monthName = useMemo(() => {
      return new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(
        new Date(year, month)
      );
    }, [year, month]);

    const daysGrid = useMemo(() => {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      let startDayIndex = firstDay.getDay() - 1;
      if (startDayIndex === -1) startDayIndex = 6;

      const daysInMonth = lastDay.getDate();
      const cells = [];

      for (let i = 0; i < startDayIndex; i++) {
        cells.push(
          <div key={`empty-${i}`} className={cn(s.calendarDay, s.empty)} />
        );
      }

      for (let day = 1; day <= daysInMonth; day++) {
        cells.push(
          <div key={day} className={s.calendarDay}>
            <span className={s.dayNumber}>{day}</span>
            {day === 18 && (
              <Icon
                name="heart"
                fill="none"
                className={s.heartIcon}
                size={42}
              />
            )}
          </div>
        );
      }

      return cells;
    }, [year, month]);

    return (
      <div className={cn(s.calendar, { [s.hidden]: !inView })} ref={ref}>
        <span className={s.title}>
          {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year}
        </span>
        <div className={s.calendarHeader}>
          <div>ПН</div>
          <div>ВТ</div>
          <div>СР</div>
          <div>ЧТ</div>
          <div>ПТ</div>
          <div>СБ</div>
          <div>ВС</div>
        </div>
        <div className={s.calendarGrid}>{daysGrid}</div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
