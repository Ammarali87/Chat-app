import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
 
export default function App() {
  return (
    // min-h-screen flex flex-col

<div className="min-h-screen flex flex-col  ">
     <Navbar/> 
    <div className="flex  flex-1 flex-col gap-3 items-center 
    justify-center h-screen bg-blue-500 text-white
     bg-[url('./public/bgImage.svg')] bg-cover ">  
     
     <Toaster/>
     
      <Routes>
        <Route index={true} element={<HomePage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>  
     <Footer/>
     </div>
  );
}