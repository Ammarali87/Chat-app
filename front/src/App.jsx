import { Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import SignupPage from "./pages/SignupPage";
 
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/> 
      <div className="flex flex-1 flex-col gap-3 items-center justify-center 
        bg-blue-500 text-white bg-[url('./public/bgImage.svg')] bg-cover">  
        
        <Toaster position="top-right" reverseOrder={false} />
        
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>  
      <Footer/>
    </div>
  );
}