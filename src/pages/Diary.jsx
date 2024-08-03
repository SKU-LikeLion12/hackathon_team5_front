import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // CSS 애니메이션 파일 임포트
import { images } from '../images';


export default function Diary() {
    const contentRef1 = useRef();
    const contentRef2 = useRef();
    const navigate = useNavigate();

    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [memory, setMemory] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [clickedButton, setClickedButton] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // 날짜를 당일로 고정
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    }, []);

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

    const inputHandlers = {
        handleInput1: (e) => {
            setContent1(e.target.innerText);
        },
        handleInput2: (e) => {
            setContent2(e.target.innerText);
        }
    };

    const handleMemoryChange = (e) => {
        if (e.target.alt === 'good') {
            setMemory(true);
            setClickedButton('good');
        } else {
            setMemory(false);
            setClickedButton('bad');
        }
    };

    const checkExistingGoodMemory = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("로그인이 필요합니다.");
            return false;
        }

        try {
            const response = await axios.get(`https://team5back.sku-sku.com/api/diaries?date=${selectedDate}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            return response.data.length > 0;
        } catch (error) {
            console.error('Error checking existing good memory:', error);
            return false;
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
                    'Authorization': `${token}`
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

    const handleSaveClick = async () => {
        if (clickedButton === 'good') {
            const hasExistingGoodMemory = await checkExistingGoodMemory();
            if (hasExistingGoodMemory) {
                alert("이미 오늘의 좋은 기억이 저장되었습니다.");
                return;
            }
            saveDiary();
        } else {
            setIsDeleting(true); // 애니메이션 시작
            setTimeout(() => {
                alert("나쁜 기억이 삭제되었습니다.");
                navigate('/');
                setIsDeleting(false); // 애니메이션 종료 후 상태 초기화
            }, 2000); // 애니메이션 시간과 동일하게 설정
        }
    };

    return (
        <div className={`flex flex-row justify-center w-[100%] ${isDeleting ? 'trash-throw' : ''}`}>
            <div className="flex justify-center bg-[#eef1f6] w-[90%]">
                <div className="relative w-[40%] min-h-fit flex justify-center items-center">
                    <div className="absolute w-[80%] h-[90%] bg-[#CAD6E2] z-0 top-[70px] left-[45px]"></div>
                    <div className="w-[80%] h-[90%] mx-auto bg-white justify-center items-center z-10">
                        <div className="text-center font-bold text-[18px] mt-[10%]">
                            오늘의 기분은 ?
                        </div>

                        <div className="my-[6%] font-bold flex flex-row justify-evenly">
                            <div className={`flex flex-col text-center ${clickedButton === 'good' ? 'ring-4 ring-inset ring-transparent rounded-full shadow-md p-1' : ''}`}>
                                <button 
                                    onClick={handleMemoryChange} 
                                    className={`mb-[14px] font-bold w-[100px] h-[60px] rounded-full`}
                                >
                                    <img src={images.good} alt="good" />
                                </button>
                                <div className='mt-5'>Good</div>
                            </div>
                            <div className={`flex flex-col font-bold text-center ${clickedButton === 'bad' ? 'ring-4 ring-inset ring-transparent rounded-full shadow-md p-1' : ''}`}>
                                <button 
                                    onClick={handleMemoryChange} 
                                    className={`mb-[14px] font-bold w-[100px] h-[60px] rounded-full`}
                                >
                                    <img src={images.bad} alt="bad" />
                                </button>
                                <div className='mt-5'>Bad</div>
                            </div>
                        </div>

                        <div id='day' className="flex justify-center">
                            <input 
                                type="date" 
                                className="rounded-lg text-center py-2 px-3 bg-[#eef1f6]" 
                                value={selectedDate} 
                                readOnly
                            />
                        </div>

                        <div className="mt-[30px] mx-[10%] w-[80%] bg-[#eef1f6] max-h-fit rounded-lg p-3">
                            <div className="py-5 text-lg font-bold text-center px-9">
                                오늘의 감정
                            </div>
                            <div className="input_box text_wrapper mx-[10%]">
                                <textarea
                                    className="w-full rounded-lg bg-[#eef1f6]"
                                    value={content1}
                                    ref={contentRef1}
                                    onChange={(e) => setContent1(e.target.value)}
                                    onInput={inputHandlers.handleInput1}
                                    placeholder="오늘 하루 느꼈던 감정을 세세하게 적어주세요."
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

                        <div className='flex justify-center w-[100%] h-fit mt-[6%]'>
                            <button onClick={handleSaveClick} className="bg-[#CAD6E2] w-[40%] rounded-2xl shadow-md font-bold p-3">
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-[46%] h-fit flex justify-center items-center relative">
                    <div className={`relative`}>
                        <div className="absolute top-[15%] left-[37%] text-center font-bold text-[18px]">
                            오늘의 일기
                        </div>
                        <img src={images.letter} alt='일기' className="w-[90%] mt-[10%] mr-[60px]" />
                        <div className="absolute top-[20%] left-[20%] right-[5%] p-4">
                            <textarea
                                className="w-[60%] rounded-lg bg-opacity-25"
                                value={content2}
                                ref={contentRef2}
                                onChange={(e) => setContent2(e.target.value)}
                                onInput={inputHandlers.handleInput2}
                                placeholder="오늘은 어떤 일이 있으셨나요?"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: '1.9',
                                    borderBottom: '1px solid #ddd',
                                    background: 'linear-gradient(transparent 95%, #ddd 95%)',
                                    backgroundSize: '100% 30px',
                                    resize: 'none',
                                    boxSizing: 'border-box',
                                    minHeight: '330px',
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
