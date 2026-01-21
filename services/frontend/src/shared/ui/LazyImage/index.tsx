import { forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ILazyImageProps {
  img?: string;
  threshold?: number;
  forceVisible?: boolean;
  className?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  wrapperClassName?: string;
}
export const LazyImage = forwardRef<HTMLDivElement, ILazyImageProps>(
  ({ img, className, wrapperClassName, onError }, ref) => {
    return (
      <div ref={ref} className={wrapperClassName}>
        <LazyLoadImage
          className={className}
          src={img}
          onError={onError}
          effect="blur"
        />
      </div>
    );
  }
);

LazyImage.displayName = 'LazyImage';
