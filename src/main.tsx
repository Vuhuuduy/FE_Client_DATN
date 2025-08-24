// main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { CartProvider } from "./context/CartContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"
import { VoucherProvider } from "./context/VoucherContext"



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>

          <Toaster richColors position="top-right" />
          
          <App />
          
          <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

