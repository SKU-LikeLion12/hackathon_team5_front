import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import Diary from "./pages/Diary";
import Fire from "./pages/Fire";


export default function App() {
  return (
    <div className='bg-[#EEF1F6] min-h-screen'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/diary' element={<Diary />} />
          <Route path='/fire' element={<Fire />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}