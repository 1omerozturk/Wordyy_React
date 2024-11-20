import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Layout } from './pages/Layout'
import Wordy from './pages/Wordy/Wordy'
import { Home } from './pages/Home'
import { Error } from './pages/Error'
import Quiz from './pages/Quiz'
import Profile from './pages/User/Profile'
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import ProtectedRoute from './components/Route/ProtectedRoute'
import isAuthenticated from './components/Route/IsAuthenticated'
import WordyAdd from './pages/Wordy/WordyAdd'
import { WordyEdit } from './pages/Wordy/WordyEdit'
import { WordyList } from './pages/Wordy/WordyList'
import { UserProvider } from './pages/User/UserContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/wordy',
        element: (
          <ProtectedRoute>
            <Wordy />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'wordyedit/:id',
            element: <WordyEdit />,
          },
        ],
      },
      {
        path: '/wordyadd',
        element: (
          <ProtectedRoute>
            <WordyAdd />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/wordylist',
        element: (
          <ProtectedRoute>
            <WordyList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quiz',
        element: (
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<UserProvider>
<RouterProvider router={router} />
</UserProvider>

)
