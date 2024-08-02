import React, { useContext } from 'react';
import { AuthContext } from '../pages/AuthContext';
import { NavLink } from 'react-router-dom';

export default function Home() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className='flex flex-column flex-wrap justify-center h-[100%] w-[100%] m-3'>
            {isLoggedIn ? (
                <div className='flex flex-col items-center h-[100%] w-[100%] m-3'>
                    <div className='flex'>
                        <img src="img/tree1.png" alt="tree" className='flex w-[1200px]' />
                    </div>
                    <div className='flex flex-column justify-around rounded-2xl bottom-[-12%] w-[30%] h-[fit] 
                        bg-white shadow-2xl'>
                        <div className='flex flex-row items-center m-1'>
                            <img src="img/apple.png" alt="leaf" className='flex w-5 m-4' />
                            <div className='flex border-r-[3px] border-black h-4 mx-3'></div>
                            <div className='flex justify-center ml-3 font-semibold'>새로운 기억을 저장하세요 !</div>
                        </div>
                    </div>
                    <NavLink to='/diary' className='fixed flex bottom-11 right-11'>
                        <div className='flex justify-center bg-[#C4D4E9] rounded-full w-[60px] h-[60px]'>
                            <div className='flex items-center'>
                                <img src="img/pen.png" alt="pen" className='flex size-7' />
                            </div>
                        </div>
                    </NavLink>
                </div>
            ) : (
                <div className='flex flex-column flex-wrap justify-center h-[100%] w-[100%] m-3'>
                    <div className='flex'>
                        <img src="img/tree1.png" alt="tree" className='flex w-[1200px]' />
                    </div>
                    <div className='flex flex-column justify-around rounded-2xl bottom-[-12%] w-[30%] h-[fit]
                        bg-white shadow-2xl'>
                        <div className='flex items-center m-1'>
                            <img src="img/leaf.png" alt="leaf" className='flex w-5 m-4' />
                            <div className='flex border-r-[3px] border-black h-4 mx-3'></div>
                            <div className='flex justify-center ml-3 font-semibold'>새로운 기억을 저장하려면 로그인을 해주세요 !</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
