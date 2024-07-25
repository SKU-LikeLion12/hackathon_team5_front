import React from 'react';
import { NavLink } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa6";

export default function HeaderLogin() {
    return (
        <div className='px-12 py-4'>
            <div className='flex justify-between border-b-[1px] border-b-[#548BD3]'>
                <NavLink to='/' className='flex'>
                    <img src="img/logo.png" alt="logo" className=' flex w-[90px]' />
                    <div className='flex items-center ml-5 text-4xl font-MaplestoryOTFBold'>Good or Bad</div>
                </NavLink>
                <div className='flex items-center justify-center'>
                    <NavLink to='/attendance' className={({ isActive }) => `flex-row ${isActive ? 'text-[#709EE1]' : 'text-black'}`}>
                        <FaRegCalendarCheck size={18} className='mx-auto' />
                        <div>출석체크</div>
                    </NavLink>
                    <NavLink to='/login' className={({ isActive }) => `flex-row ml-7 ${isActive ? 'text-[#709EE1]' : 'text-black'}`}>
                        <TbLogout2 size={21} className='mx-auto' />
                        <div>로그아웃</div>
                    </NavLink>
                </div>
            </div>
        </div> 
    )
}