import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [idValid, setIdValid] = useState(false);
    const [pw, setPw] = useState('');
    const [pwValid, setPwValid] = useState(false);
    const [pwConfirm, setPwConfirm] = useState('');
    const [pwMatch, setPwMatch] = useState(true);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;
        setIdValid(regex.test(e.target.value));
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,}$/;
        setPwValid(regex.test(e.target.value));
    };

    const handlePwConfirm = (e) => {
        setPwConfirm(e.target.value);
        setPwMatch(e.target.value === pw);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^[a-zA-Z0-9+-/_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        setEmailValid(regex.test(e.target.value));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            confirmMessage();
        }
    };
    
    const confirmMessage = async () => {
        if (idValid && pwValid && pwMatch && emailValid) {
            const payload = {
                userId: id,
                name: name,
                password: pw,
                email: email
            };

            try {
                const response = await axios.post('https://team5back.sku-sku.com/api/add', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    alert(`${id}님 회원가입을 축하드립니다!`);
                    navigate('/login');
                } else {
                    alert('회원가입 중 오류가 발생했습니다.');
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('이미 존재하는 아이디입니다.');
                } else {
                    console.error('회원가입 중 오류가 발생했습니다.', error);
                    alert('회원가입 중 오류가 발생했습니다.');
                }
            }
        } else {
            alert('모든 필드를 올바르게 입력해주세요.');
        }
    };

    useEffect(() => {
        setNotAllow(!(idValid && pwValid && pwMatch && emailValid));
    }, [idValid, pwValid, pwMatch, emailValid]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[#EEF1F6]'>
            <form className='w-[45%] p-[3%] shadow-2xl rounded-2xl mx-auto bg-[#EEF1F6]' style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
                <div className='text-2xl font-bold text-center'>
                    회원가입
                </div>
                <div className='text-xl font-bold color-[#262626] mt-1'>이름</div>
                <input
                    id='User_id'
                    type='text'
                    value={name}
                    placeholder='이름을 입력하세요.'
                    onChange={handleName}
                    onKeyDown={handleKeyPress}
                    className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
                />
                <div className='text-xl font-bold color-[#262626] mt-10'>이메일</div>
                <input
                    value={email}
                    type='text'
                    placeholder='이메일을 입력하세요.'
                    className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
                    onChange={handleEmail}
                    onKeyDown={handleKeyPress}
                />
                {!emailValid && email.length > 0 && (
                    <div className='mt-2 text-xs text-red-500'>
                        이메일 형식으로 입력해주세요.
                    </div>
                )}
                <div className='text-xl font-bold color-[#262626] mt-10'>아이디</div>
                <input
                    value={id}
                    onChange={handleId}
                    onKeyDown={handleKeyPress}
                    type='text'
                    placeholder='아이디를 입력하세요.'
                    className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
                />
                {!idValid && id.length > 0 && (
                    <div className='mt-2 text-xs text-red-500'>
                        영문, 숫자 포함 6자 이상 입력해주세요.
                    </div>
                )}
                <div className='text-xl font-bold color-[#262626] mt-10'>비밀번호</div>
                <input
                    value={pw}
                    onChange={handlePw}
                    onKeyDown={handleKeyPress}
                    type='password'
                    placeholder='영문, 숫자, 특수문자 포함 7자 이상 입력하세요.'
                    className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
                />
                {!pwValid && pw.length > 0 && (
                    <div className='mt-2 text-xs text-red-500'>
                        영문, 숫자, 특수문자 포함 7자 이상 입력해주세요.
                    </div>
                )}
                <div className='text-xl font-bold color-[#262626] mt-10'>비밀번호 확인</div>
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
                <div className='flex justify-center'>
                    <button
                        type='button'
                        disabled={notAllow}
                        onClick={confirmMessage}
                        className='w-[70%] rounded-full mt-12 p-4 h-12 text-sm 
                                bg-[#C4D4E9] text-black font-bold disabled:text-white'
                    >
                        확인
                    </button>
                </div>
            </form>
        </div>
    );
}
