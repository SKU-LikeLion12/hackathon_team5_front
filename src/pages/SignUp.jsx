import React, {useState, useEffect}from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    // const [name, setName] = useState('');
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

    // const handleName = (e) => {
    //     setName(e.target.value);
    // }

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
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,}$/;

        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
        };

    const handlePwConfirm = (e) => {
        setPwConfirm(e.target.value);
        setPwMatch(e.target.value === pw);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;

        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
        };

    const confirmMessage = () => {
        if(idValid && pwValid && pwMatch && emailValid) {
            alert(`${id}님 회원가입을 축하드립니다!`);
            navigate('/login');
        }else {
            alert('모든 필드를 올바르게 입력해주세요.');
        }
    }

    useEffect(() => {
        if(idValid && pwValid && pwMatch && emailValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [idValid,pwValid,pwMatch,emailValid])

    return (
        <div 
        className='w-[50%] mx-auto mt-10 mb-6 p-[50px] rounded-3xl drop-shadow-2xl bg-[#E2E9F2]'
        style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}
        >
            <div className='text-2xl font-bold text-center'>
                회원가입
            </div>
{/* 
            <div className='text-xl font-bold color-[#262626] mt-1'>이름</div>
            <input 
            type="text"
            value={name}
            placeholder='이름을 입력하세요.'
            onChange = {handleName}
            className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
            /> */}

            <div className='text-xl font-bold color-[#262626] mt-10'>아이디</div>
            <input 
            value={id}
            onChange = {handleId}
            type="text" 
            placeholder='아이디를 입력하세요.' 
            className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
            />

            {!idValid && id.length > 0 && (
                <div className="mt-2 text-xs text-red-500">
                    영문, 숫자 포함 6자 이상 입력해주세요.
                </div>
            )}
            
            <div className='text-xl font-bold color-[#262626] mt-10'>비밀번호</div>
            <input 
            value={pw}
            onChange={handlePw}
            type="password"
            placeholder='영문, 숫자, 특수문자 포함 8자 이상 입력하세요.' 
            className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
            />

            {!pwValid && pw.length > 0 && (
                <div className="mt-2 text-xs text-red-500">
                    영문, 숫자, 특수문자 포함 6자 이상 입력해주세요.
                </div>
            )}

            <div className='text-xl font-bold color-[#262626] mt-10'>비밀번호 확인</div>
            <input 
            value={pwConfirm}
            onChange={handlePwConfirm}
            type="password"
            placeholder='비밀번호를 입력하세요.' 
            className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
            />
            {!pwMatch && pwConfirm.length > 0 && (
                <div className="mt-2 text-xs text-red-500">
                    비밀번호가 일치하지 않습니다.
                </div>
            )}

            <div className='text-xl font-bold color-[#262626] mt-10'>이메일</div>
            <input 
            value={email}
            type="text" 
            placeholder='이메일을 입력하세요.' 
            className='w-full mt-4 rounded-2xl p-4 border-[1px] border-[#e2e0e0] h-12 text-sm'
            onChange={handleEmail}
            />
            {!emailValid && email.length > 0 && (
                <div className="mt-2 text-xs text-red-500">
                    이메일 형식으로 입력해주세요.
                </div>
            )}
            
            <div className='flex justify-center'>
                <button
                disabled = {notAllow}
                onClick={confirmMessage}
                className='w-[70%] rounded-full mt-12 p-4 h-12 text-sm 
                            bg-[#C4D4E9] text-black font-bold disabled:text-white'>
                    확인
                </button>
            </div>
        </div>
    )
}

export default SignUp;