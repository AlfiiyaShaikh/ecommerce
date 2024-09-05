import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router/Router.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StripeProvider from './pages/shop/StripeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StripeProvider>

    <RouterProvider router={router} />
  </StripeProvider>

);
