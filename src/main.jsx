import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom"
import './index.css'

import Browse from './pages/Browse'
import Landing from './pages/Landing'
import Watch from './pages/Watch'
import Register from './pages/Register'
import Login from './pages/Login'
import Favorite from './pages/Favorite'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/watch/:id',
    element: <Watch />
  },
  {
    path: '/register',
    element: <Register />
  }
  ,
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/favorite',
    element: <Favorite />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
