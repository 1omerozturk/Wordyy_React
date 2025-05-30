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
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import ProtectedRoute from './components/Route/ProtectedRoute'
import WordyAdd from './pages/Wordy/WordyAdd'
import Translate from './pages/Translate/Translate'
import { WordyEdit } from './pages/Wordy/WordyEdit'
import { WordyList } from './pages/WordyList/WordyList'
import { UserProvider } from './pages/User/UserContext'
import { WordyListAdd } from './pages/WordyList/WordyListAdd'
import { WordyListEdit } from './pages/WordyList/WordyListEdit'
import { Profile } from './pages/User/Profile'
import ProfileEdit from './pages/User/ProfileEdit'
import { WordyListDetail } from './pages/WordyList/WordyListDetail'
import AdminRoute from './components/Route/AdminRoute'
import AdminWordy from './pages/User/Admin/AdminWordy'
import Admin from './pages/User/Admin/Admin'
import AdminUser from './pages/User/Admin/AdminUser'

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
        element: <Wordy />,
        children: [
          {
            path: 'wordyedit/:id',
            element: (
              <ProtectedRoute>
                <WordyEdit />,
              </ProtectedRoute>
            ),
          },
          {
            path: 'wordyadd',
            element: (
              <ProtectedRoute>
                <WordyAdd />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/wordylist',
        element: (
          <ProtectedRoute>
            <WordyList />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'wordylistadd/:id',
            element: <WordyListAdd />,
          },
          {
            path: 'wordylistadd',
            element: <WordyListAdd />,
          },
          {
            path: 'wordylistedit/:id',
            element: <WordyListEdit />,
          },
          {
            path: ':id',
            element: <WordyListDetail />,
          },
        ],
      },
      {
        path: '/translate',
        element: (
          <ProtectedRoute>
            <Translate />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
            path: 'profileedit/:id',
            element: <ProfileEdit />,
          },
        ],
      },
      {
        path: '/admin',
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
        children: [
          {
            path: 'wordy',
            element: <AdminWordy />,
          },
          {
            path: 'user',
            element: <AdminUser />,
          },
        ],
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
        path: '/quiz/:id',
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
  </UserProvider>,
)
