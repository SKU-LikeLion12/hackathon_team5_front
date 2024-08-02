import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import Diary from "./pages/Diary";
import Fire from "./pages/Fire";
import IdFind from "./pages/IdFind";
import PasswordFind from "./pages/PasswordFind";
import Info from "./pages/Info";
import Footer from "./components/Footer";
import { AuthProvider } from './pages/AuthContext';



export default function App() {

  return (
    <div className='bg-[#EEF1F6] min-h-screen'>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/attendance' element={<Attendance />} />
            <Route path='/diary' element={<Diary />} />
            <Route path='/fire' element={<Fire />} />
            <Route path='/idEmail' element={<IdFind />} />
            <Route path='/passwordEmail' element={<PasswordFind />} />
            <Route path='/info' element={<Info />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}