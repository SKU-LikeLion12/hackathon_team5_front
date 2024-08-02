import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { GrFormPrevious } from "react-icons/gr";
import { IoIosSave } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

export default function Main() {
    const contentRef1 = useRef();
    const contentRef2 = useRef();

    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [currentView, setCurrentView] = useState('mood');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        if (contentRef1.current) {
            contentRef1.current.value = content1; // Set value for textarea
        }
    }, [content1]);

    useEffect(() => {
        if (contentRef2.current) {
            contentRef2.current.value = content2; // Set value for textarea
        }
    }, [content2]);

    const handleInput1 = (e) => {
        setContent1(e.target.value); // Update state with textarea value
    };

    const handleInput2 = (e) => {
        setContent2(e.target.value); // Update state with textarea value
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const toggleView = () => {
        setCurrentView((prevView) => (prevView === 'mood' ? 'diary' : 'mood'));
    };

    const saveDiary = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }
    
        const payload = {
            date: selectedDate,
            content: content2,
            goodMemory: content1 === 'Good'
        };
    
        try {
            const response = await axios.post('https://team5back.sku-sku.com/api/diaries', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 토큰을 Authorization 헤더에 추가
                }
            });
    
            if (response.status === 200) {
                alert("일기가 저장되었습니다.");
            } else {
                alert('일기 저장 중 오류가 발생했습니다.');
            }
        } catch (error) {
            if (error.response) {
                console.error('에러 응답:', error.response);
                if (error.response.status === 404) {
                    alert('API 엔드포인트를 찾을 수 없습니다. URL을 확인해 주세요.');
                } else if (error.response.status === 401) {
                    alert('토큰이 만료되었거나 서명 검증에 실패했습니다. 로그인 상태를 확인해 주세요.');
                } else {
                    alert('일기 저장 중 오류가 발생했습니다.');
                }
            } else {
                alert('일기 저장 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };
    

    return (
        <div className='flex flex-row justify-center w-[100%] mt-10'>
            <div className="flex max-h-fit justify-center bg-[#eef1f6] w-[90%]">
                {currentView === 'mood' && (
                    <div className="relative w-[40%] max-h-fit flex justify-center items-center">
                        <div className="absolute w-[80%] h-[95%] bg-[#CAD6E2] z-0 top-[70px] left-[45px]"></div>
                        <div className="w-[80%] h-[100%] p-4 mx-auto bg-white justify-center items-center z-10">
                            <div id='title' className="flex justify-center font-bold text-[18px] mt-[10%]">
                                Today's emotion
                                <MdNavigateNext className='flex justify-end size-6 text-[#C4D4E9]' onClick={toggleView} />
                            </div>

                            <div className="my-[6%] font-bold flex flex-row justify-evenly">
                                <div className="flex flex-col text-center">
                                    <button className="mb-[14px] font-bold w-[100px] h-[60px] rounded-full">
                                        <img src="img/good.png" alt="good" />
                                    </button>
                                    <div className='mt-5'>Good</div>
                                </div>
                                <NavLink to='/fire' className="flex flex-col font-bold text-center">
                                    <button className="mb-[14px] font-bold w-[100px] h-[60px] rounded-full">
                                        <img src="img/bad.png" alt="bad" />
                                    </button>
                                    <div className='mt-5'>Bad</div>
                                </NavLink>
                            </div>

                            <div id='day' className="flex justify-center my-[6%]">
                                <input 
                                    type="date" 
                                    className="rounded-lg py-3 px-5  bg-[#eef1f6]" 
                                    value={selectedDate} 
                                    onChange={handleDateChange} 
                                />
                            </div>

                            <div className="mt-[30px] mx-[10%] w-[80%] bg-[#eef1f6] max-h-fit rounded-lg p-3">
                                <div className="py-5 text-lg font-bold text-center px-9">
                                    오늘의 감정
                                </div>
                                <div className="input_box text_wrapper mx-[10%]">
                                    <textarea
                                        className="w-full rounded-lg bg-[#eef1f6]"
                                        ref={contentRef1}
                                        onChange={handleInput1}
                                        style={{
                                            whiteSpace: 'pre-wrap',
                                            lineHeight: '1.9',
                                            borderBottom: '1px solid #ddd',
                                            background: 'linear-gradient(transparent 95%, #ddd 95%)',
                                            backgroundSize: '100% 30px',
                                            resize: 'none',
                                            boxSizing: 'border-box',
                                            minHeight: '240px',
                                            outline: 'none',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentView === 'diary' && (
                    <div className="w-[50%] h-fit flex relative ml-7">
                        <div className="relative">
                            <div className="absolute left-[20%] top-[5%] text-center font-bold text-[18px]">
                                <div id='title' className='flex justify-around'>
                                    <GrFormPrevious className='text-[#C4D4E9] flex mr-12 size-6' onClick={toggleView} />
                                    Today's diary
                                    <IoIosSave className='text-[#C4D4E9] flex ml-12 size-6' onClick={saveDiary} />
                                </div>
                            </div>
                            <img src="img/letter.png" alt='일기' className="w-[80%]" />
                            <div className="absolute top-[14%] left-[16%] right-[8%]">
                                <textarea
                                    className="flex justify-center w-[60%] rounded-lg bg-opacity-25"
                                    ref={contentRef2}
                                    onChange={handleInput2}
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.9',
                                        borderBottom: '1px solid #ddd',
                                        background: 'linear-gradient(transparent 95%, #ddd 95%)',
                                        backgroundSize: '100% 30px',
                                        resize: 'none',
                                        boxSizing: 'border-box',
                                        minHeight: '360px',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
