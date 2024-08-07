import React, { useState } from 'react';
import axios from 'axios';

export default function PasswordEmail() {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const handleUserId = (e) => {
        setUserId(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        setEmailValid(regex.test(e.target.value));
    };

    const handleSubmit = async () => {
        if (!emailValid || !userId) {
            setMessage('유효한 아이디와 이메일을 입력해 주세요.');
            return;
        }

        try {
            const response = await axios.post('https://team5back.sku-sku.com/api/forgot-password', {
                userId,
                email,
            });

            if (response.status === 200) {
                setMessage(`비밀번호 재설정 이메일이 전송되었습니다.`);
            } else {
                setMessage('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 404) {
                    setMessage(error.response.data);
                } else {
                    setMessage('비밀번호 재설정 요청 중 오류가 발생했습니다.');
                }
            } else {
                setMessage('비밀번호 재설정 요청 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="bg-[#EEF1F6] min-h-fit mt-[9%] flex items-center justify-center">
            <div className="w-[35%] rounded-3xl shadow-md bg-[#E2E9F2] p-10" style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
                <div className="mb-6 text-lg font-bold text-center">
                    이메일을 입력해주세요.<br />
                    비밀번호 재설정 메일을 보내드립니다.
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

                <div className="text-lg font-bold text-[#262626] p-3 mb-2 w-[80%] mx-[10%]">이메일</div>
                <input
                    type="text"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={handleEmail}
                    className="w-[80%] mx-[10%] rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm"/>
                {!emailValid && (
                    <div className="text-red-500 text-xs mb-4 w-[80%] mx-[10%]">
                        유효한 이메일 주소를 입력해주세요.
                    </div>
                )}
                <button 
                    onClick={handleSubmit} 
                    className="w-[50%] mx-[25%] rounded-3xl mb-4 p-3 h-12 text-sm bg-[#C4D4E9] font-bold" 
                    disabled={!emailValid || !userId}>
                    이메일 전송
                </button>
                {message && (
                    <div className="mt-4 text-center text-red-500">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
