import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function PasswordFind() {
    const [message, setMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [pwValid, setPwValid] = useState(false);
    const [pwConfirm, setPwConfirm] = useState('');
    const [pwMatch, setPwMatch] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            localStorage.setItem('token', tokenFromUrl); // 토큰을 로컬 저장소에 저장
        }
    }, [location]);

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

        const token = localStorage.getItem('token'); // 저장된 토큰 가져오기

        try {
            console.log('Submitting data:', { token, newPassword }); // 디버깅 정보를 콘솔에 출력
            const response = await axios.put('https://team5back.sku-sku.com/api/reset-password', {
                token,
                newPassword
            });

            console.log('Response:', response.data); // 서버 응답 데이터 출력

            if (response.status === 200) {
                setMessage('비밀번호가 성공적으로 변경되었습니다.');
                navigate('/login'); // 비밀번호 변경 후 로그인 페이지로 이동
            } else {
                console.log('Unexpected response:', response); // 예상치 못한 응답 출력
            }
        } catch (error) {
            console.error('Error response:', error.response); // 디버깅 정보를 콘솔에 출력
            console.error('Error response data:', error.response ? error.response.data : error.message); // 응답 데이터 출력
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
                        value={newPassword}
                        onChange={handlePw}
                        onKeyDown={handleKeyPress}
                        type='password'
                        placeholder='영문, 숫자, 특수문자 포함 7자 이상 입력하세요.'
                        className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
                    />
                    {!pwValid && newPassword.length > 0 && (
                        <div className='mt-2 text-xs text-red-500'>
                            영문, 숫자, 특수문자 포함 7자 이상 입력해주세요.
                        </div>
                    )}
                    <div className='text-xl font-bold text-[#262626] mt-10'>비밀번호 확인</div>
                    <input
                        value={pwConfirm}
                        onChange={handlePwConfirm}
                        onKeyDown={handleKeyPress}
                        type='password'
                        placeholder='비밀번호를 입력하세요.'
                        className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
                    />
                    {!pwMatch && pwConfirm.length > 0 && (
                        <div className='mt-2 text-xs text-red-500'>
                            비밀번호가 일치하지 않습니다.
                        </div>
                    )}

                    <button
                        className="w-[50%] mx-[25%] rounded-3xl m-4 p-3 h-12 text-sm bg-[#C4D4E9] font-bold"
                        onClick={handleSubmit}
                        disabled={!pwValid || !pwMatch}
                    >확인</button>
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
