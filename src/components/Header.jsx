import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { MdRememberMe } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { AuthContext } from '../pages/AuthContext';
import { images } from '../images';

export default function Header() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.');
    };

    return (
        <div className='px-12 py-4'>
            <div className='flex justify-between border-b-[1px] border-b-[#548BD3]'>
                <NavLink to='/' className='flex'>
                    <img src={images.logo} alt="logo" className=' flex w-[90px]' />
                    <div id='title' className='flex items-center ml-5 text-4xl'>Good or Bad</div>
                </NavLink>
                <div className='flex items-center justify-center'>
                    {!isLoggedIn ? (
                        <>
                            <NavLink to='/login' className={({ isActive }) => `flex-row ml-7 ${isActive ? 'text-[#709EE1]' : 'text-black'}`}>
                                <TbLogin2 size={21} className='mx-auto' />
                                <div>로그인</div>
                            </NavLink>
                            <NavLink to='/signUp' className={({ isActive }) => `flex-row ml-7 ${isActive ? 'text-[#709EE1]' : 'text-black'}`}>
                                <MdRememberMe size={20} className='mx-auto' />
                                <div>회원가입</div>
                            </NavLink>
                        </>
                    ) : (
                        <div className='flex flex-row text-black cursor-pointer'>
                            <div onClick={handleLogout} className='flex flex-col'>
                                <TbLogout2 size={21} className='flex mx-auto' />
                                <div>로그아웃</div>
                            </div>
                            <NavLink to='/attendance' className={({ isActive }) => `flex flex-col ml-7 ${isActive ? 'text-[#709EE1]' : 'text-black'}`}>
                                <FaRegCalendarCheck size={18} className='mx-auto' />
                                <div>출석체크</div>
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
