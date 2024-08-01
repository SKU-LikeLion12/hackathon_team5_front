import React from 'react'

export default function Info() {
    return (
        <div>
            <div className='flex flex-col items-center my-6 min-h-fit'>
                <div className='flex w-[10%]'><img src="/img/likelion.png" alt="likelion" /></div>
                <div id='title' className='flex my-6 text-3xl font-bold'>Good or Bad</div>
                <div className='flex text-[#6F6F6F] mb-5'>개발진 소개</div>
            </div>

            <div className='flex flex-col items-center mx-auto'>
                <div className='flex flex-wrap flex-col-3'>
                    <div className='flex mx-7'><img src="/img/jm.png" alt="jm" className='w-64' /></div>
                    <div className='flex mx-7'><img src="/img/uj.png" alt="uj" className='w-64' /></div>
                    <div className='flex mx-7'><img src="/img/sm.png" alt="sm" className='w-64' /></div>
                </div>
                <div className='flex mt-7 flex-col-2'>
                    <div className='flex mx-7'><img src="/img/hw.png" alt="hw" className='w-64' /></div>
                    <div className='flex mx-7'><img src="/img/dh.png" alt="dh" className='w-64' /></div>
                </div>
            </div>
        </div>
    )
}
