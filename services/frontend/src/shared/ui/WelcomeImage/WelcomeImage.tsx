import cn from 'classnames';
import { useState } from 'react';
import WelcomeImg from '../../images/e7fcbcf05bc59b899fb39440e6fa8ceb.jpg';
import { Icon } from '../Icon';
import { LazyImage } from '../LazyImage';
import { Timer } from '../Timer';
import s from './styles.module.scss';

export const WelcomeImage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpenLock, setIsOpenLock] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={s.container}>
      <div
        className={cn(s.imageWrapper, {
          [s.imageWrapperExpanded]: isExpanded
        })}
      >
        <LazyImage
          img={WelcomeImg}
          className={s.image}
          wrapperClassName={s.lazyImageWrapper}
        />
      </div>
      <div
        className={cn(s.buttonWrapper, {
          [s.buttonWrapperExpanded]: isExpanded
        })}
      >
        <button
          className={s.button}
          onClick={handleClick}
          onMouseEnter={() => setIsOpenLock(true)}
          onMouseLeave={() => setIsOpenLock(false)}
        >
          <div className={s.iconContainer}>
            <Icon
              name="lock"
              size={62}
              fill="white"
              className={cn(s.icon, { [s.active]: !isOpenLock })}
            />
            <Icon
              name="unlock"
              size={62}
              fill="white"
              className={cn(s.icon, { [s.active]: isOpenLock })}
            />
          </div>
        </button>
        <span className={s.buttonText}>Разблокируйте приглашение</span>
      </div>
      <div className={s.titleContainer}>
        <div className={s.internalTitleContainer}>
          <span className={cn(s.letter, s.right)}>A</span>
          <h1 className={s.title}>АБАТ & АЙНАРА</h1>
          <span className={cn(s.letter, s.left)}>A</span>
        </div>

        <Timer isView={isExpanded} />
      </div>
    </div>
  );
};
