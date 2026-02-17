import s from './styles.module.scss';

export const Greeting = () => {
  return (
    <div className={s.greeting}>
      <span className={s.mainTitle}>
        Дорогие д. Акбулат и т. Оля, Дидара, Гюзель, Ажара!
      </span>
    </div>
  );
};
