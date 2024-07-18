import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";


function App() {
  return (
    <div className='bg-[#EEF1F6] min-h-screen'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;