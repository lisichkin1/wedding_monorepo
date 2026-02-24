import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import s from './styles.module.scss';

export const Details = () => {
  const { ref: refDetails, inView: inViewDetails } = useInView({
    threshold: 0.5
  });
  return (
    <div
      className={cn(s.container, { [s.hidden]: !inViewDetails })}
      ref={refDetails}
    >
      <span className={s.mainTitle}>ДЕТАЛИ</span>
      <span className={s.text}>
        Дорогие гости, приносите с собой веселье и радость в душе, а подарки - в
        конверте!
      </span>
      <span className={s.text}>
        К великому сожалению, в ресторане нет детских зон и нет возможности
        пригласить аниматоров для того, чтобы занять самых маленьких наших
        гостей, потому просим заранее подумать о том, с кем оставить Вашу кроху
        на праздничный вечер.
      </span>
    </div>
  );
};
