import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@shared/ui';
import s from './styles.module.scss';

export const Program = () => {
  const { ref: refProgram, inView: inViewProgram } = useInView({
    threshold: 0.5
  });

  return (
    <div
      className={cn(s.container, { [s.hidden]: !inViewProgram })}
      ref={refProgram}
    >
      <span className={s.mainTitle}>ПРОРАММА ДНЯ</span>
      <div className={s.program}>
        <div className={cn(s.rigntUp, s.subTitleStep)}>
          Приготовьте платочки для трогательного момента
        </div>
        <div className={cn(s.rigntMiddle, s.subTitleStep)}>
          Время вкусной еды, танцев и развлечений
        </div>
        <div className={cn(s.rigntDown, s.subTitleStep)}>
          Мы очень благодарны, что Вы провели с нами этот чудесный день!
        </div>
        <div className={cn(s.middleDivider)}>
          <Icon name="heart" fill="black" className={s.heartIcon} size={16} />
          <Icon name="heart" fill="black" className={s.heartIcon} size={16} />
        </div>
        <div className={cn(s.leftUpFirst, s.time)}>15:20</div>
        <div className={cn(s.leftUpSecond, s.titleStep)}>Регистрация</div>
        <div className={cn(s.leftMiddleFirst, s.time)}>17:00</div>
        <div className={cn(s.leftMiddleSecond, s.titleStep)}>Банкет</div>
        <div className={cn(s.leftDowmFirst, s.time)}>00:00</div>
        <div className={cn(s.leftDowmSecond, s.titleStep)}>Завершение</div>
      </div>
    </div>
  );
};
