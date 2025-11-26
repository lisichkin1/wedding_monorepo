import { Outlet } from 'react-router-dom';
import s from './styles.module.scss';

export const MainLayout = () => {
  return (
    <div className={s.appLayout}>
      <Outlet />
    </div>
  );
};
