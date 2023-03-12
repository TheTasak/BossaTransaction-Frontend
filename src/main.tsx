import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Transactions from "./components/Transactions/Transactions";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/transactions',
        element: <Transactions />,
        errorElement: <ErrorPage />

    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
