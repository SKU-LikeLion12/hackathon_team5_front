import React, { useState, useEffect, useRef } from 'react';

export default function Fire() {
    const contentRef = useRef();
    const [content, setContent] = useState('');
    const [burning, setBurning] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
        contentRef.current.innerText = content;
        }
    }, [content]);

    const handleInput = (e) => {
        setContent(e.target.value);
    };

    const startBurning = () => {
        setBurning(true);
    };

    return (
        <>
        <div className="flex justify-center items-center bg-[#eef1f6]">
            <div className={`relative w-full max-w-xl ${burning ? 'burning' : ''}`}>
            <div className="absolute top-[15%] left-[50%] transform -translate-x-1/2 text-center font-bold text-[18px]">
                오늘의 일기
            </div>
            <img src="img/letter.png" alt="일기" className="w-full mt-8" onClick={startBurning}/>
            <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 w-[70%] p-4">
                <textarea
                className="w-full h-full bg-opacity-25 rounded-lg"
                ref={contentRef}
                onChange={(e) => setContent(e.target.value)}
                onInput={handleInput}
                style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.9',
                    borderBottom: '1px solid #ddd',
                    background: 'linear-gradient(transparent 95%, #ddd 95%)',
                    backgroundSize: '100% 30px',
                    resize: 'none',
                    boxSizing: 'border-box',
                    minHeight: '300px',
                    outline: 'none',
                }}
                />
            </div>
            </div>
        </div>
        </>
    );
}
