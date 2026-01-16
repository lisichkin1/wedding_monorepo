import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import cn from 'classnames';
import { JSX } from 'react';

interface ILazyImageProps {
  img?: string;
  threshold?: number;
  forceVisible?: boolean;
  className?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  wrapperClassName?: string;
}

export const LazyImage = ({
  img,
  threshold,
  forceVisible = false,
  className,
  wrapperClassName,
  onError
}: ILazyImageProps): JSX.Element => {
  return (
    <LazyLoadImage
      className={className}
      draggable={false}
      effect="blur"
      onError={onError}
      placeholder={<div className={cn('lazy-load-image-background')}>{}</div>}
      src={img}
      threshold={threshold}
      visibleByDefault={forceVisible}
      wrapperClassName={wrapperClassName}
    />
  );
};
