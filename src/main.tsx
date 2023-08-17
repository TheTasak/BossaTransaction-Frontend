import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Transactions from "./components/Transactions/Transactions";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CurrentTransactions from "./components/Transactions/CurrentTransactions";
import TransactionsForm from "./components/Transactions/TransactionsForm";
import HomeLayout from "./components/common/HomeLayout";
import AuthLayout from "./components/common/AuthLayout";
import ProtectedLayout from "./components/common/ProtectedLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route element={<HomeLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<CurrentTransactions />} />
                <Route path="/transactions/load" element={<Transactions />} />
                <Route path="/transaction" element={<TransactionsForm />} />
                <Route path="/transaction/:id" element={<TransactionsForm />} />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
