import React from 'react';
import { NavLink } from 'react-router-dom';
import { TbLogin2 } from "react-icons/tb";
import { MdRememberMe } from "react-icons/md";

export default function Header() {
    return (
        <div className='px-10 pt-3'>
            <div className='flex justify-between border-b-[1px] border-b-[#548BD3]'>
                <NavLink to='/' className='flex'>
                    <img src="img/logo.png" alt="logo" className=' flex w-[120px]' />
                    <div className='flex items-center ml-3 text-5xl font-extrabold font-mplus-rounded'>Good or Bad</div>
                </NavLink>
                <NavLink to='/login' className={({ isActive }) => `flex justify-center items-center ${isActive ? 'text-[#709EE1]' : 'text-black'}`}>
                    <div className='flex-row'>
                        <TbLogin2 size={20} className='mx-auto' />
                        <div>로그인</div>
                    </div>
                    <NavLink to='/signUp' className={({ isActive }) => `flex-row ml-7 ${isActive ? 'text-[#709EE1]' : 'text-black'}`}>
                        <MdRememberMe size={20} className='mx-auto' />
                        <div>회원가입</div>    
                    </NavLink>
                </NavLink>
            </div>
        </div> 
    )
}