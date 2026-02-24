import cn from 'classnames';
import { ReactNode } from 'react';
import s from './styles.module.scss';

interface ButtonProps {
  href?: string;
  padding?: string;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  href,
  padding,
  children,
  type,
  className,
  disabled
}: ButtonProps) => {
  if (href) {
    return (
      <a className={s.button} href={href} style={{ padding }}>
        {children}
      </a>
    );
  }

  return (
    <button className={cn(className, s.button)} type={type} disabled={disabled}>
      {children}
    </button>
  );
};
