import React, { useState } from 'react';
import axios from 'axios';

export default function IdFind() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [message, setMessage] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!emailValid) return;

        try {
            const response = await axios.post('https://team5back.sku-sku.com/api/find/userId', {
                email,
                name,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setMessage(`사용자 아이디: ${response.data}`);
            } else {
                setMessage('알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage('이름 혹은 이메일이 존재하지 않습니다.');
            } else {
                setMessage('서버와 연결할 수 없습니다.');
            }
        }
    };

    return (
        <>
            <div className="bg-[#EEF1F6] min-h-fit mt-[9%] flex items-center justify-center">
                <div className="w-[35%] rounded-3xl shadow-md bg-[#E2E9F2] p-10" style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
                    <div className="mb-6 text-lg font-bold text-center">
                        아이디 찾기
                    </div>

                    <div>
                        <div className="text-lg font-bold text-[#262626] p-3 mb-2 w-[80%] mx-[10%]">이름</div>
                        <input
                            type="text"
                            placeholder="가입한 이름을 입력해주세요."
                            value={name}
                            onChange={handleName}
                            onKeyDown={handleKeyPress}
                            className="w-[80%] mx-[10%] rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm" />
                    </div>

                    <div className='mb-[8%]'>
                        <div className="text-lg font-bold text-[#262626] p-3 mb-2 w-[80%] mx-[10%]">이메일</div>
                        <input
                            type="text"
                            placeholder="가입한 이메일을 입력해주세요."
                            value={email}
                            onChange={handleEmail}
                            onKeyDown={handleKeyPress}
                            className="w-[80%] mx-[10%] rounded-xl mb-3 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm" />
                        {!emailValid && (
                            <div className="text-red-500 text-xs mb-4 w-[80%] mx-[10%]">
                                유효한 이메일 주소를 입력해주세요.
                            </div>
                        )}
                    </div>
                    <button 
                        className="w-[50%] mx-[25%] rounded-3xl mb-4 p-3 h-12 text-sm bg-[#C4D4E9] font-bold" 
                        disabled={!emailValid} 
                        onClick={handleSubmit}> 확인</button>
                    {message && (
                        <div className="mt-4 text-sm text-center text-red-500">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
