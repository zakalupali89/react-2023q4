import './App.css';
import Home from './pages/home/Home.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page.tsx';
import Detail from './pages/detail/Detail.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'detail/:name',
        element: <Detail />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
