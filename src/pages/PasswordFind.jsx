import React, { useState } from 'react';
import axios from 'axios';

export default function PasswordFind() {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [message, setMessage] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        setEmailValid(regex.test(e.target.value));
    };

    const handleUserId = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = async () => {
        if (!emailValid) {
            setMessage('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        const token = localStorage.getItem('token'); // 저장된 토큰 가져오기

        try {
            console.log('Submitting data:', { userId, email }); // 디버깅 정보를 콘솔에 출력
            const response = await axios.post('https://team5back.sku-sku.com/forgot-password', {
                userId,
                email,
            }, {
                headers: {
                    'Authorization': `${token}` // 토큰을 헤더에 포함
                }
            });

            console.log('Response:', response.data); // 서버 응답 데이터 출력

            if (response.status === 200) {
                setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
            } else {
                console.log('Unexpected response:', response); // 예상치 못한 응답 출력
            }
        } catch (error) {
            console.error('Error response:', error.response); // 디버깅 정보를 콘솔에 출력
            console.error('Error response data:', error.response ? error.response.data : error.message); // 응답 데이터 출력
            if (error.response && error.response.status === 404) {
                if (error.response.data === '존재하지 않는 회원입니다.') {
                    setMessage('존재하지 않는 회원입니다.');
                } else if (error.response.data === '존재하지 않는 이메일입니다.') {
                    setMessage('존재하지 않는 이메일입니다.');
                }
            } else {
                setMessage('비밀번호 재설정 요청 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <>
            <div className="bg-[#EEF1F6] min-h-fit mt-[9%] flex items-center justify-center">
                <div className="w-[35%] rounded-3xl shadow-md bg-[#E2E9F2] p-10" style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
                    <div className="mb-6 text-lg font-bold text-center">
                        비밀번호 찾기
                    </div>

                    <div>
                        <div className="text-lg font-bold text-[#262626] p-3 mb-2 w-[80%] mx-[10%]">아이디</div>
                        <input
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            value={userId}
                            onChange={handleUserId}
                            className="w-[80%] mx-[10%] rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm" />
                    </div>
                    
                    <div className='mb-[8%]'>
                        <div className="text-lg font-bold text-[#262626] p-3 mb-2 w-[80%] mx-[10%]">이메일</div>
                        <input
                            type="text"
                            placeholder="가입한 이메일을 입력해주세요."
                            value={email}
                            onChange={handleEmail}
                            className="w-[80%] mx-[10%] rounded-xl mb-3 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm" />
                        {!emailValid && (
                            <div className="text-red-500 text-xs mb-4 w-[80%] mx-[10%]">
                                유효한 이메일 주소를 입력해주세요.
                            </div>
                        )}
                    </div>
                    {message && (
                        <div className="text-red-500 text-xs mb-4 w-[80%] mx-[10%]">
                            {message}
                        </div>
                    )}
                    <button
                        className="w-[50%] mx-[25%] rounded-3xl mb-4 p-3 h-12 text-sm bg-[#C4D4E9] font-bold"
                        disabled={!emailValid || !userId}
                        onClick={handleSubmit}>확인</button>
                </div>
            </div>
        </>
    );
}
