import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { images } from '../images';

export default function GoodMemory() {
    const { date } = useParams();
    const navigate = useNavigate();

    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [newContent1, setNewContent1] = useState('');
    const [newContent2, setNewContent2] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDiary = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('토큰이 없습니다. 로그인 해주세요.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://team5back.sku-sku.com/api/diaries?date=${date}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (response.status === 200 && response.data) {
                    setContent1(response.data.emotion || '');
                    setContent2(response.data.content || '');
                    setNewContent1(response.data.emotion || '');
                    setNewContent2(response.data.content || '');
                } else {
                    setError('일기 데이터를 불러오지 못했습니다.');
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 401) {
                        const message = error.response.data.message;
                        if (message.includes('서명 검증에 실패했습니다.')) {
                            setError('토큰이 올바르지 않습니다. 로그인 해주세요.');
                        } else if (message.includes('토큰이 만료되었습니다.')) {
                            setError('토큰이 만료되었습니다. 로그인 해주세요.');
                        } else {
                            setError('인증 오류가 발생했습니다. 다시 로그인 해주세요.');
                        }
                    } else if (status === 403) {
                        setError('해당 날짜의 일기가 없습니다.');
                    } else {
                        setError('일기 데이터를 불러오는 중 오류가 발생했습니다.');
                    }
                } else {
                    setError('일기 데이터를 불러오는 중 오류가 발생했습니다.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchDiary();
    }, [date]);

    useEffect(() => {
        if (error) {
            alert(error);
            navigate('/'); // 에러가 있을 때 홈 페이지로 리디렉션
        }
    }, [error, navigate]);

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('토큰이 없습니다. 로그인 해주세요.');
            return;
        }

        const payload = {
            date: date,
            newContent: newContent2,
            newEmotion: newContent1,
        };

        try {
            const response = await axios.put('https://team5back.sku-sku.com/api/diaries/update', payload, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (response.status === 200) {
                setContent1(newContent1);
                setContent2(newContent2);
                alert('일기가 수정되었습니다.');
                navigate('/');
            } else {
                setError('일기 수정 중 오류가 발생했습니다.');
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    const message = error.response.data.message;
                    if (message.includes('서명 검증에 실패했습니다.')) {
                        setError('토큰이 올바르지 않습니다. 로그인 해주세요.');
                    } else if (message.includes('토큰이 만료되었습니다.')) {
                        setError('토큰이 만료되었습니다. 로그인 해주세요.');
                    } else {
                        setError('인증 오류가 발생했습니다. 다시 로그인 해주세요.');
                    }
                } else if (status === 403) {
                    setError('해당 날짜의 일기가 없습니다.');
                } else {
                    setError('일기 수정 중 오류가 발생했습니다.');
                }
            } else {
                setError('일기 수정 중 오류가 발생했습니다.');
            }
        }
    };

    if (isLoading) {
        return <div className='flex items-center justify-center'>로딩 중...</div>;
    }

    return (
        <div className='flex flex-row justify-center w-[100%]'>
            <div className="flex justify-center bg-[#eef1f6] w-[80%]">
                <div className="relative w-[40%] min-h-fit flex justify-center items-center">
                    <div className="absolute w-[80%] h-[90%] bg-[#CAD6E2] z-0 top-[70px] left-[45px]"></div>
                    <div className="flex flex-col w-[80%] h-[90%] mx-auto bg-white justify-around items-center z-10">
                        <div className="flex text-center font-bold text-[18px] mt-[10%]">
                            오늘의 기분은 ?
                        </div>
                        <img src={images.good} alt="good" className="w-[100px] h-[100px]" />

                        <div id='day' className="flex justify-center">
                            <input 
                                type="date" 
                                className="rounded-lg text-center py-2 px-3 bg-[#eef1f6]" 
                                readOnly
                                value={date}
                            />
                        </div>

                        <div className="mx-[10%] w-[80%] bg-[#eef1f6] max-h-fit rounded-lg p-3">
                            <div className="py-5 text-lg font-bold text-center px-9">
                                오늘의 감정
                            </div>
                            <div className="input_box text_wrapper mx-[10%]">
                                <textarea
                                    className="w-full rounded-lg bg-[#eef1f6]"
                                    value={newContent1}
                                    onChange={(e) => setNewContent1(e.target.value)}
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: '1.9',
                                        borderBottom: '1px solid #ddd',
                                        background: 'linear-gradient(transparent 95%, #ddd 95%)',
                                        backgroundSize: '100% 30px',
                                        resize: 'none',
                                        boxSizing: 'border-box',
                                        minHeight: '210px',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleUpdate} className="absolute bottom-[-25px] bg-[#CAD6E2] w-[40%] rounded-2xl shadow-md font-bold p-3">
                        수정하기
                    </button>
                </div>

                <div className="w-[46%] h-fit flex justify-center items-center relative">
                    <div className={`relative`}>
                        <div className="absolute top-[15%] left-[37%] text-center font-bold text-[18px]">
                            오늘의 일기
                        </div>
                        <img src={images.diary} alt='diary' className="w-[90%] mt-[10%] mr-[60px]" />
                        <div className="absolute top-[20%] left-[20%] right-[5%] p-4">
                            <textarea
                                className="w-[60%] rounded-lg bg-opacity-25"
                                value={newContent2}
                                onChange={(e) => setNewContent2(e.target.value)}
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: '1.9',
                                    borderBottom: '1px solid #ddd',
                                    background: 'linear-gradient(transparent 95%, #ddd 95%)',
                                    backgroundSize: '100% 30px',
                                    resize: 'none',
                                    boxSizing: 'border-box',
                                    minHeight: '300px',
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
