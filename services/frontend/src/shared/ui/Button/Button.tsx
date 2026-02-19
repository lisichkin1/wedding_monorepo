import { ReactNode } from 'react';
import s from './styles.module.scss';

interface ButtonProps {
  href?: string;
  padding?: string;
  children?: ReactNode;
}

export const Button = ({ href, padding, children }: ButtonProps) => {
  if (href) {
    return (
      <a className={s.button} href={href} style={{ padding }}>
        {children}
      </a>
    );
  }

  return <button className={s.button}>{children}</button>;
};
