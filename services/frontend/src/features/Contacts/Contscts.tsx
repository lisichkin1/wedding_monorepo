import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import s from './styles.module.scss';

export const Contscts = () => {
  const { ref: refContscts, inView: inViewContscts } = useInView({
    threshold: 0.5
  });
  return (
    <div
      className={cn(s.container, { [s.hidden]: !inViewContscts })}
      ref={refContscts}
    >
      <span className={s.mainTitle}>ОСТАЛИСЬ ВОПРОСЫ?</span>
      <a href="tel:+79873319162" className={s.phone}>
        Жених: +7 987 331 9162
      </a>
      <a href="tel:+79372244808" className={s.phone}>
        Невеста: +7 937 224 4808
      </a>
    </div>
  );
};
