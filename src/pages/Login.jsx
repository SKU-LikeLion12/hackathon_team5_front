import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function Login() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);

    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;
        setIdValid(regex.test(e.target.value));
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;
        setPwValid(regex.test(e.target.value));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            confirmMessage();
        }
    };


    const confirmMessage = async () => {
        if (idValid && pwValid) {
            const payload = {
                userId: id,
                password: pw
            };

            try {
                const response = await axios.post('https://team5back.sku-sku.com/api/session-login', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const token = response.data; 
                    localStorage.setItem('token', token); 
                    alert(`${id}님 로그인에 성공했습니다!`);
                    setIsLoggedIn(true); // 로그인 상태를 true로 설정
                    navigate('/');
                } else {
                    alert('로그인 중 오류가 발생했습니다.');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('아이디, 비밀번호가 일치하지 않습니다.');
                } else {
                    console.error('로그인 중 오류가 발생했습니다.', error);
                    alert('로그인 중 오류가 발생했습니다.');
                }
            }
        } else {
            alert('아이디와 비밀번호를 올바르게 입력해주세요.');
        }
    };

    useEffect(() => {
        setNotAllow(!(idValid && pwValid));
    }, [idValid, pwValid]);

    return (
        <div className='mt-[8%]'>
            <div className="bg-[#EEF1F6] min-h-fit flex items-center justify-center">
                <div className="flex flex-col justify-center w-[35%] rounded-3xl shadow-2xl bg-[#E2E9F2] p-10" style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
                    <div className="mb-6 text-3xl font-bold text-center">로그인</div>
                    <div className="text-xl font-bold text-[#262626] mb-4">아이디</div>
                    <input
                        type="text"
                        value={id}
                        onChange={handleId}
                        onKeyDown={handleKeyPress}
                        placeholder="아이디를 입력하세요."
                        className="w-full rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm"
                    />
                    {!idValid && id.length > 0 && (
                        <div className="mb-4 text-xs text-red-500">
                            영문, 숫자 포함 6자 이상 입력해주세요.
                        </div>
                    )}

                    <div className="text-xl font-bold text-[#262626] mb-4">비밀번호</div>
                    <input
                        type="password"
                        value={pw}
                        onChange={handlePw}
                        onKeyDown={handleKeyPress}
                        placeholder="비밀번호를 입력하세요."
                        className="w-full rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm"
                    />
                    {!pwValid && pw.length > 0 && (
                        <div className="mb-4 text-xs text-red-500">
                            영문, 숫자 포함 6자 이상 입력해주세요.
                        </div>
                    )}

                    <div className="flex justify-between text-xs text-[#666] mb-4">
                        <div>
                            <input type="checkbox" id="remember" className="mr-1" />
                            <label htmlFor="remember" className='text-[#7A90AE]'>로그인 유지</label>
                        </div>
                        <div className='flex flex-row'>
                            <NavLink to='/idFind' className='text-[#7A90AE] mr-[20px]'>아이디 찾기</NavLink>
                            <NavLink to='/passwordEmail' className='text-[#7A90AE]'>비밀번호 찾기</NavLink>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <button
                            disabled={notAllow}
                            onClick={confirmMessage}
                            className="w-full rounded-full mb-4 p-3 h-12 text-sm text-black bg-[#C4D4E9] disabled:text-white font-bold "
                        >로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}