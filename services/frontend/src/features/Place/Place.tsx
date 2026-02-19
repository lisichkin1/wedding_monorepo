import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import {
  DGIS_APP,
  DGIS_URL,
  YANDEX_MAP_APP,
  YANDEX_MAP_URL
} from '@shared/constants';
import { Button } from '@shared/ui/Button';
import s from './styles.module.scss';

export const Place = () => {
  const { ref: refPlace, inView: inViewPlace } = useInView({
    threshold: 0.5
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div
      className={cn(s.container, { [s.hidden]: !inViewPlace })}
      ref={refPlace}
    >
      <span className={s.mainTitle}>МЕСТО ТОРЖЕСТВА</span>
      <span className={s.placeName}>
        Ресторан Счастье. Адрес: г. Саратов, ул. Крайняя, д.129 (Большой зал)
      </span>
      <Button
        href={isMobile ? YANDEX_MAP_APP : YANDEX_MAP_URL}
        padding="10px 26px"
      >
        Яндекс карты
      </Button>
      <Button href={isMobile ? DGIS_APP : DGIS_URL} padding="10px 26px">
        2ГИС
      </Button>
    </div>
  );
};
