import React, { useContext } from 'react';
import { AuthContext } from '../pages/AuthContext';
import { NavLink } from 'react-router-dom';
import { images } from '../images';

export default function Home() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className='flex flex-column flex-wrap justify-center h-[100%] w-[100%]'>
            {isLoggedIn ? (
                <div className='flex flex-col items-center h-[100%] w-[100%] m-3'>
                    <div className='flex'>
                        <img src={images.postA} alt="postA" className='flex size-[70%] ml-[10%]' />
                    </div>
                    <div className='flex flex-column justify-around rounded-2xl bottom-[-12%] w-[30%] h-[fit] 
                        bg-white shadow-2xl'>
                        <div className='flex flex-row items-center m-1'>
                            <img src={images.letter} alt="letter" className='flex w-5 m-4' />
                            <div className='flex border-r-[3px] border-black h-4 mx-3'></div>
                            <div className='flex justify-center ml-3 font-semibold'>새로운 기억을 저장하세요 !</div>
                        </div>
                    </div>
                    <NavLink to='/diary' className='fixed flex bottom-11 right-11'>
                        <div className='flex justify-center bg-[#C4D4E9] rounded-full w-[60px] h-[60px]'>
                            <div className='flex items-center'>
                                <img src={images.pen} alt="pen" className='flex size-7' />
                            </div>
                        </div>
                    </NavLink>
                </div>
            ) : (
                <div className='flex flex-col items-center h-[100%] w-[100%] m-3'>
                    <div className='flex'>
                        <img src={images.postB} alt="postB" className='flex size-[70%] ml-[10%]' />
                    </div>
                    <div className='flex flex-column justify-around rounded-2xl bottom-[-12%] w-[30%] h-[fit] 
                        bg-white shadow-2xl'>
                        <div className='flex flex-row items-center m-1'>
                            <img src={images.letter} alt="letter" className='flex w-5 m-4' />
                            <div className='flex border-r-[3px] border-black h-4 mx-3'></div>
                            <div className='flex justify-center ml-3 font-semibold'>새로운 기억을 저장하세요 !</div>
                        </div>
                    </div>
                    <NavLink to='/diary' className='fixed flex bottom-11 right-11'>
                        <div className='flex justify-center bg-[#C4D4E9] rounded-full w-[60px] h-[60px]'>
                            <div className='flex items-center'>
                                <img src={images.pen} alt="pen" className='flex size-7' />
                            </div>
                        </div>
                    </NavLink>
                </div>
            )}
        </div>
    );
}
