import { RouterProvider } from 'react-router-dom';
import { ReactQueryProvider } from './providers';
import { router } from './router';
import './styles/index.scss';

const App = () => {
  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  );
};

export default App;
