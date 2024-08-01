import React, { useState } from 'react';

export default function Email() {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  return (
    <>
      <div className="bg-[#EEF1F6] min-h-screen flex items-center justify-center">
        <div className="w-[35%] rounded-3xl shadow-md bg-[#E2E9F2] p-10" style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
          <div className="text-lg font-bold mb-6 text-center">
            이메일을 입력해주세요.<br />
            비밀번호 재설정 메일을 보내드립니다.
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
          <div className="p-5">
          <button className="w-[50%] mx-[25%] rounded-3xl mb-4 p-3 h-12 text-sm bg-[#C4D4E9] font-bold" 
          disabled={!emailValid}> 이메일 전송 </button>
          </div>
        </div>
      </div>
    </>
  );
}
