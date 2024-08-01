import React, { useState, useEffect, useRef } from 'react';

export default function Main() {
    const contentRef1 = useRef();
    const contentRef2 = useRef();

    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');

    useEffect(() => {
        if (contentRef1.current) {
        contentRef1.current.innerText = content1;
        }
    }, [content1]);

    useEffect(() => {
        if (contentRef2.current) {
        contentRef2.current.innerText = content2;
        }
    }, [content2]);

    const handleInput1 = (e) => {
        setContent1(e.target.innerText);
    };

    const handleInput2 = (e) => {
        setContent2(e.target.innerText);
    };

    return (
        <>
        <div className="flex flex-row bg-[#eef1f6]">
            <div className="relative w-[50%] h-screen flex justify-center items-center">
            <div className="absolute w-[80%] h-[90%] bg-[#CAD6E2] z-0 top-[70px] left-[45px]"></div>
            <div className="w-[80%] h-[90%] mx-auto bg-white justify-center items-center z-10">
                <div className="text-center font-bold text-[18px] mt-[8%]">
                오늘의 기분은 ?
                </div>

                <div className="mt-[30px] font-bold flex flex-row justify-center">
                <div className="flex flex-col text-center">
                    <button className="mb-[8px] font-bold bg-[#eef1f6] w-[100px] h-[100px] rounded-full"> <img src="/img/Good.jpg"/></button>
                    Good
                </div>
                <div className="flex flex-col font-bold text-center ml-10">
                    <button className="mb-[8px] font-bold bg-[#eef1f6] w-[100px] h-[100px] rounded-full"><img src="/img/Bad.jpg"/></button>
                    Bad
                </div>
                </div>

                <div className="mt-[30px] mx-[10%] w-[80%] bg-[#eef1f6] h-[45%] rounded-lg mx-auto">
                <div className="p-9 text-lg font-bold text-center">
                    오늘의 감정
                </div>
                <div className="input_box text_wrapper mx-[10%]">
                    <textarea
                    className="w-full rounded-lg bg-[#eef1f6]"
                    ref={contentRef1}
                    onChange={(e) => setContent1(e.target.value)}
                    contentEditable
                    onInput={handleInput1}
                    style={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.9',
                        borderBottom: '1px solid #ddd',
                        background: 'linear-gradient(transparent 95%, #ddd 95%)',
                        backgroundSize: '100% 30px',
                        resize: 'none',
                        boxSizing: 'border-box',
                        minHeight: '150px',
                        outline: 'none',
                    }}
                    />
                </div>
                </div>

                <button className="mt-[5%] bg-[#eef1f6] h-[8%] rounded-lg shadow-md w-[calc(70%-10px)] mx-[15%] font-bold ">
                저장하기
                </button>
            </div>
            </div>

            <div className="w-[46%] h-fit flex justify-center items-center relative">
            <div className="relative ">
                <div className="absolute top-[15%] left-[37%] text-center font-bold text-[18px]">
                오늘의 일기
                </div>
                <img src="../img/zz.png" alt='일기' className="w-[90%] mt-[10%] mr-[60px]" />
                <div className="absolute top-[20%] left-[20%] right-[5%]  p-4">
                <textarea
                    className="w-[60%] rounded-lg bg-opacity-25"
                    ref={contentRef2}
                    onChange={(e) => setContent2(e.target.value)}
                    onInput={handleInput2}
                    style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.9',
                    borderBottom: '1px solid #ddd',
                    background: 'linear-gradient(transparent 95%, #ddd 95%)',
                    backgroundSize: '100% 30px',
                    resize: 'none',
                    boxSizing: 'border-box',
                    minHeight: '390px',
                    outline: 'none',
                    }}
                />
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
