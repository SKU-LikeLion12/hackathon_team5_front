import React from 'react'
import { IoPerson } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

function Footer() {
    const emailUrl = 'mailto:sku@likelion.org';
    const instaUrl = 'https://www.instagram.com/likelion_sku/';
    const kakaoUrl = 'https://pf.kakao.com/_vxixlaxj/';

    return (
        <div className='mt-12 bg-[#EEF1F6] p-6'>
            <NavLink to='/info'>
                <IoPerson className='size-6 ml-9 my-5 text-[#548BD3]' />    
            </NavLink>
            {/* <div className='font-medium text-[#999]'>만든이들</div> */}
            
            {/* <div className="text-xs leading-loose">
                LikeLion Theater는 성결대 멋쟁이사자처럼에서 제작하였습니다.
                <br />
                서비스 및 동아리 관련 문의는 위 채널들을 통해 해주시길 바랍니다.
            </div> */}
        </div>
    );
}

export default Footer;