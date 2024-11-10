import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Layout } from './pages/Layout';
import Wordy from './pages/Wordy';
import { Home } from './pages/Home';
import { Error } from './pages/Error';
import Quiz from './pages/Quiz';
import Profile from './pages/User/Profile';
import Login from './pages/User/Login';
import Register from './pages/User/Register';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <Error/>,
      children: [
        {
          index: true,
          element: <Home/>,        
        },
        {
         path:'/wordy',
          element: <Wordy/>,        
        },
        {
         path:'/profile',
          element: <Profile/>,        
        },
        {
         path:'/quiz',
          element: <Quiz/>,        
        },
        {
         path:'/login',
          element: <Login/>        
        },
        {
         path:'/register',
          element: <Register/>,        
        },
        
      ]
    }
  ])
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <RouterProvider router={router} />
  );

