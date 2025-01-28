import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import TenantPayment from "./pages/TenantPayment";
import { useState, useEffect } from "react";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Check localStorage for dark mode preference on initial render
  useEffect(() => {
    const storedPreference = localStorage.getItem("darkMode");
    if (storedPreference === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route
          path="/"
          element={<Home toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
        />
        <Route
          path="/register/:userId"
          element={
            <Register toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
        <Route
          path="/login"
          element={
            <Login toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
        <Route
          path="/users/:id"
          element={
            <UserProfile toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
        <Route
          path="/payments"
          element={
            <TenantPayment
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
            />
          }
        />
        <Route
          path="*"
          element={
            <NotFound toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
