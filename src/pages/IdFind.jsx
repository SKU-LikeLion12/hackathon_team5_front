import { NavLink } from 'react-router-dom';

export default function IdFind() {
    
    return (
        <>
        <div className="bg-[#EEF1F6] min-h-fit mt-[9%] flex items-center justify-center">
            <div className="w-[35%] rounded-3xl shadow-md bg-[#E2E9F2] p-10" style={{ boxShadow: '0px 4px 12px rgba(120, 157, 195, 0.8)' }}>
                <div className="mb-6 text-lg font-bold text-center">
                    아이디 찾기
                </div>
                <div className="text-md text-center font-semibold text-[#999] p-3 mb-4 w-[80%] mx-[10%]">회원정보와 일치하는 아이디입니다.</div>
                <div className='bg-[#FAFBFD] w-[80%] mx-[10%] rounded-xl mb-[10%] p-3 border-[1px] border-[#e2e0e0] h-12 text-sm'></div>

                <NavLink to='/login'>
                    <button className="w-[50%] mx-[25%] rounded-3xl mb-4 p-3 h-12 text-sm bg-[#C4D4E9] font-bold" >로그인 하기</button>
                </NavLink>
            </div>
        </div>
        </>
    );
}
