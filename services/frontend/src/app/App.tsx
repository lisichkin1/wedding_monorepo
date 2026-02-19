import { RouterProvider } from 'react-router-dom';
import { ReactQueryProvider, StoreProvider } from './providers';
import { router } from './router';
import './styles/index.scss';

const App = () => {
  return (
    <ReactQueryProvider>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </ReactQueryProvider>
  );
};

export default App;
