import React from 'react'
import { IoPerson } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

function Footer() {

    return (
        <div className='mt-12 bg-[#EEF1F6] p-6'>
            <NavLink to='/info'>
                <IoPerson className='size-6 ml-9 my-5 text-[#548BD3]' />    
            </NavLink>
        </div>
    );
}

export default Footer;