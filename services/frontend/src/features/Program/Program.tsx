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
        <div className={s.div5}>
          <Icon name="heart" fill="black" className={s.heartIcon} size={16} />
          <Icon name="heart" fill="black" className={s.heartIcon} size={16} />
        </div>
        <div className={s.div1}>
          <div className={s.time}>14:00</div>
          <div className={s.titleStep}>Сбор гостей</div>
        </div>
        <div className={s.div2}>
          <div className={s.time}>15:00</div>
          <div className={s.titleStep}>Банкет</div>
        </div>
        <div className={s.div3}>
          <div className={cn(s.time, s.timeLeft)}>14:45</div>
          <div className={cn(s.titleStep, s.titleStepLeft)}>Церемония</div>
        </div>
        <div className={s.div4}>
          <div className={cn(s.time, s.timeLeft)}>21:00</div>
          <div className={cn(s.titleStep, s.titleStepLeft)}>Завершение</div>
        </div>
      </div>
    </div>
  );
};
