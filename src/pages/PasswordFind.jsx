import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PasswordFind() {
    const [message, setMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [pwValid, setPwValid] = useState(false);
    const [pwConfirm, setPwConfirm] = useState('');
    const [pwMatch, setPwMatch] = useState(true);
    const navigate = useNavigate();
    const token = window.location.href.split('=').pop();
    // console.log(token);

    const handlePw = (e) => {
        setNewPassword(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,}$/;
        setPwValid(regex.test(e.target.value));
    };

    const handlePwConfirm = (e) => {
        setPwConfirm(e.target.value);
        setPwMatch(e.target.value === newPassword);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!pwValid || !pwMatch) {
            setMessage('유효한 비밀번호를 입력하고 확인해 주세요.');
            return;
        }

        try {
            const response = await axios.put('https://team5back.sku-sku.com/api/reset-password', {
                token,
                newPassword
            });

            if (response.status === 200) {
                setMessage('비밀번호가 성공적으로 변경되었습니다.');
                navigate('/login'); // 비밀번호 변경 후 로그인 페이지로 이동
            } else {
                setMessage('비밀번호 변경 요청 중 오류가 발생했습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('토큰이 만료되었습니다. 다시 시도해 주세요.');
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
                        비밀번호 재설정
                    </div>

                    <div className='text-xl font-bold text-[#262626] mt-10'>비밀번호</div>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={handlePw}
                        onKeyDown={handleKeyPress}
                        placeholder="비밀번호를 입력해주세요."
                        className="w-full rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm"
                    />

                    <div className='text-xl font-bold text-[#262626] mt-10'>비밀번호 확인</div>
                    <input
                        type="password"
                        value={pwConfirm}
                        onChange={handlePwConfirm}
                        onKeyDown={handleKeyPress}
                        placeholder="비밀번호를 다시 입력해주세요."
                        className="w-full rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm"
                    />
                    {!pwMatch && (
                        <div className='mb-4 text-xs text-red-500'>
                            비밀번호가 일치하지 않습니다.
                        </div>
                    )}
                    <button 
                        onClick={handleSubmit} 
                        className="w-full rounded-3xl mb-4 p-3 h-12 text-sm bg-[#C4D4E9] font-bold">
                        비밀번호 변경
                    </button>
                    {message && (
                        <div className="mt-4 text-center text-red-500">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
