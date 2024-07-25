import React, { useState } from 'react';

export default function PasswordFind() {
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [pwValid, setPwValid] = useState(true);

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[A-Za-z])(?=.*?[0-9]).{6,}$/;

        if (regex.test(e.target.value)) {
        setPwValid(true);
        } else {
        setPwValid(false);
        }
    };

    const handlePwConfirm = (e) => {
        setPwConfirm(e.target.value);
    };

    return (
        <>
        <div className="bg-[#EEF1F6] min-h-fit mt-[9%] flex items-center justify-center">
            <div className="w-[35%] rounded-3xl shadow-md bg-[#E2E9F2] p-10" style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
            <div className="mb-6 text-lg font-bold text-center">
                비밀번호 재설정
            </div>
            <div className="text-lg font-bold text-[#262626] p-3 mb-2 w-[80%] mx-[10%]">비밀번호</div>
            <input
                type="password"
                value={pw}
                onChange={handlePw}
                placeholder="비밀번호를 입력해주세요."
                className="w-[80%] mx-[10%] rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm"
            />
            {!pwValid && (
                <div className="text-red-500 text-xs mb-4 w-[80%] mx-[10%]">
                유효한 비밀번호를 입력해주세요 (영문, 숫자 포함 6자 이상).
                </div>
            )}
            <div className="text-lg font-bold text-[#262626] p-3 mb-2 w-[80%] mx-[10%]">비밀번호 확인</div>
            <input
                type="password"
                value={pwConfirm}
                onChange={handlePwConfirm}
                placeholder="비밀번호를 다시 입력해주세요."
                className="w-[80%] mx-[10%] rounded-xl mb-4 p-3 border-[1px] border-[#e2e0e0] h-12 text-sm"
            />
            <div className='mt-5'>
                <button className="w-[50%] mx-[25%] rounded-3xl mb-4 p-3 h-12 text-sm bg-[#C4D4E9] font-bold" disabled={!pwValid || pw !== pwConfirm}>
                    확인
                </button>
            </div>
            </div>
        </div>
        </>
    );
}
