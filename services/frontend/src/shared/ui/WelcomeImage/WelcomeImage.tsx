import { StoreContext } from '@app/providers/ContextProvider';
import cn from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import WelcomeImg from '../../images/320.jpg';
import { Icon } from '../Icon';
import { LazyImage } from '../LazyImage';
import { Timer } from '../Timer';
import s from './styles.module.scss';

export const WelcomeImage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpenLock, setIsOpenLock] = useState(false);
  const store = useContext(StoreContext);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
    store?.toggleViewScreen();
  };

  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = isExpanded
        ? 'translateX(-30px) scale(1.05) '
        : 'translate(-10px, 30px) scale(1.5) ';
    }
  }, [isExpanded]);

  useEffect(() => {
    setIsExpanded(false);

    if (store?.resetWelcomeState) {
      store.resetWelcomeState();
    }
  }, []);

  return (
    <div className={s.container}>
      <div
        className={cn(s.imageWrapper, {
          [s.imageWrapperExpanded]: isExpanded
        })}
      >
        <LazyImage
          ref={imageContainerRef}
          img={WelcomeImg}
          className={cn(s.image)}
          wrapperClassName={cn(s.lazyImageWrapper, {
            [s.imageExpanded]: !isExpanded
          })}
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
      <div
        className={cn(s.titleContainer, {
          [s.titleContainerView]: !isExpanded
        })}
      >
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
