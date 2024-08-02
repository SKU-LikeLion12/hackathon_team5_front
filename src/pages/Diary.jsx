import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Diary() {
    const contentRef1 = useRef();
    const contentRef2 = useRef();

    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [memory, setMemory] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

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

    const handleDateChange = (e) => {
        console.log(e)
        setSelectedDate(e.target.value);
    };

    const handleMemoryChange = (e) => {
        if (e.target.alt === 'good') {
            setMemory(true);
        } else {;
            setMemory(false)
        }
    };

    const saveDiary = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }
    
        const payload = {
            date: selectedDate,
            emotion: content1,
            content: content2,
            goodMemory: memory,
        };
    
        try {
            const response = await axios.post('https://team5back.sku-sku.com/api/diaries', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.status === 200) {
                alert("일기가 저장되었습니다.");
            } else {
                console.error('Unexpected response status:', response.status);
                alert('일기 저장 중 오류가 발생했습니다.');
            }
        } catch (error) {
            if (error.response) {
                // 서버가 상태 코드를 반환했을 경우
    console.error('Error Response Data:', error.response.data);
    console.error('Error Response Status:', error.response.status);
    console.error('Error Response Headers:', error.response.headers);
                console.error('에러 응답:', error.response);
                if (error.response.status === 404) {
                    alert('API 엔드포인트를 찾을 수 없습니다. URL을 확인해 주세요.');
                } else if (error.response.status === 401) {
                    alert('토큰이 만료되었거나 서명 검증에 실패했습니다. 로그인 상태를 확인해 주세요.');
                } else {
                    alert('일기 저장 중 오류가 발생했습니다.');
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
                alert('서버로부터 응답을 받지 못했습니다.');
            } else {
                console.error('Error during setup:', error.message);
                alert('일기 저장 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };    

    return (
        <div className='flex flex-row justify-center w-[100%]'>
            <div className="flex justify-center bg-[#eef1f6] w-[90%]">
                <div className="relative w-[40%] min-h-fit flex justify-center items-center">
                    <div className="absolute w-[80%] h-[90%] bg-[#CAD6E2] z-0 top-[70px] left-[45px]"></div>
                    <div className="w-[80%] h-[90%] mx-auto bg-white justify-center items-center z-10">
                        <div className="text-center font-bold text-[18px] mt-[10%]">
                        오늘의 기분은 ?
                        </div>

                        <div className="my-[6%] font-bold flex flex-row justify-evenly">
                            <div className="flex flex-col text-center">
                                <button onClick={handleMemoryChange} className="mb-[14px] font-bold w-[100px] h-[60px] rounded-full">
                                    <img src="img/good.png" alt="good" />
                                </button>
                                <div className='mt-5'>Good</div>
                            </div>
                            <div className="flex flex-col font-bold text-center">
                                <button onClick={handleMemoryChange} className="mb-[14px] font-bold w-[100px] h-[60px] rounded-full">
                                    <img src="img/bad.png" alt="bad" />
                                </button>
                                <div className='mt-5'>Bad</div>
                            </div>
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
                                onChange={(e) => setContent1(e.target.value)}
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

                        <div className='flex justify-center w-[100%] h-fit mt-[6%]'>
                            <button onClick={saveDiary} className="bg-[#CAD6E2] w-[40%] rounded-2xl shadow-md font-bold p-3 ">
                            저장하기
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-[46%] h-fit flex justify-center items-center relative">
                    <div className="relative ">
                        <div className="absolute top-[15%] left-[37%] text-center font-bold text-[18px]">
                        오늘의 일기
                        </div>
                        <img src="img/letter.png" alt='일기' className="w-[90%] mt-[10%] mr-[60px]" />
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
        </div>
    );
}