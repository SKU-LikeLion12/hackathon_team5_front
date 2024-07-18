import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const User = {
        id: 'test1234',
        pw: 'test1234@@',
    };

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const navigate = useNavigate();


    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;

        if (regex.test(e.target.value)) {
        setIdValid(true);
        } else {
        setIdValid(false);
        }
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;

        if (regex.test(e.target.value)) {
        setPwValid(true);
        } else {
        setPwValid(false);
        }
    };

    const confirmMessage = () => {
        if (id === User.id && pw === User.pw) {
        alert('로그인에 성공했습니다.');
        navigate('/');
        } else {
        alert('등록되지 않은 회원입니다.');
        }
    };

    useEffect(() => {
        if (idValid && pwValid) {
        setNotAllow(false);
        } else {
        setNotAllow(true);
        }
    }, [idValid, pwValid]);

    return (
        <>
        <div className="bg-[#EEF1F6] min-h-screen flex items-center justify-center">
            <div className="w-[35%] rounded-3xl shadow-2xl bg-[#E2E9F2] p-10" style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
                <div className="mb-6 text-3xl font-bold text-center">로그인</div>
                <div className="text-xl font-bold text-[#262626] mb-4">아이디</div>
                <input
                    type="text"
                    value={id}
                    onChange={handleId}
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
                    <div className='text-[#7A90AE] mr-[20px]'>아이디 찾기</div>
                    <div className='text-[#7A90AE]'>비밀번호 찾기</div>
                    </div>
                </div>
                <button
                    disabled={notAllow}
                    onClick={confirmMessage}
                    className="w-full rounded-full mb-4 p-3 h-12 text-sm text-black bg-[#C4D4E9] disabled:text-white font-bold "
                >
                    로그인
                </button>
                <div className="text-center text-xs mb-4 text-[#7A90AE]">간편 로그인</div>
                <div className="flex justify-center gap-4">
                    <button>
                    <img src="./img/Google.png" alt="Google" className="w-10 h-10 bg-white rounded-full" />
                    </button>
                    <button>
                    <img src="./img/Naver.png" alt="Naver"  className="w-10 h-10 bg-white rounded-full shadow"/>
                    </button>
                    <button>
                    <img src="./img/Kakao.png" alt="Kakao"  className="w-10 h-10 bg-white rounded-full shadow" />
                    </button>
                </div>
            </div>
        </div>
    </>
);
}
