import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/300.css';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import PageLoader from "./components/loaders/PageLoader";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AIChat from "./pages/Dashboard/AIChat";
import { configWeb3Modal } from "./connection";

configWeb3Modal();

const MarketPlace = lazy(() => import('./pages/Dashboard/MarketPlace'))
const History = lazy(() => import('./pages/Dashboard/History'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="marketplace" element={<MarketPlace />} />
      <Route path="aichat" element={<AIChat />} />
      <Route path="history" element={<History/>} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto min-h-[100vh] font-Geist bg-primary text-white font-[400]">
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  )
}

export default App