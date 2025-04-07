import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './router/Router.jsx';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={Router}>
  </RouterProvider>,
)
