import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.tsx";
import LayoutSidebar from "./pages/LayoutSidebar.tsx";
import ChatArea from "./pages/ChatArea.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/console',
    element: <LayoutSidebar children={<ChatArea />} />,
  },
], { basename: '/nutritionalai' });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider  router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
