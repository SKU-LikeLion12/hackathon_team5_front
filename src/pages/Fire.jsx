import React, { useState, useEffect, useRef } from 'react';

export default function Main2() {
  const contentRef = useRef();
  const [content, setContent] = useState('');
  const [burning, setBurning] = useState(false);
  const [isLidOpen, setIsLidOpen] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.value = content;
    }
  }, [content]);

  const handleInput = (e) => {
    setContent(e.target.value);
  };

  const startBurning = () => {
    setBurning(true);
    setIsLidOpen(true);

    setTimeout(() => {
      setIsLidOpen(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#eef1f6] relative">
        <div className={`relative w-full max-w-xl ${burning ? 'rotating-out' : ''}`}>
          <div className="absolute top-[15%] left-[50%] transform -translate-x-1/2 text-center font-bold text-[18px] ">
          Today's diary
          </div>
          <img src="../img/zz.png" alt="일기" className="w-full mt-8 cursor-pointer" onClick={startBurning} />
          <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 w-[70%] p-4">
            <textarea
              className="w-full h-full rounded-lg bg-opacity-25"
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
                opacity: burning ? 0 : 1,
                transition: 'opacity 1.5s ease-out',
              }}
              disabled={burning}
            />
          </div>
        </div>
        <img src="../img/Trash2.png" alt="쓰레기통 뚜껑 닫힘" className="absolute w-[12%] bottom-10 right-10" />
        {isLidOpen && (
          <img src="../img/Trash.png" alt="쓰레기통 뚜껑 열림" className="absolute w-[12%] bottom-10 right-10" />
        )}
      </div>

      <style jsx>{`
        @keyframes rotateScaleOut {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(calc(100vw - 20vw), calc(100vh - 25vh)) rotate(360deg) scale(0);
            opacity: 0;
          }
        }

        .rotating-out {
          animation: rotateScaleOut 2.5s forwards;
        }
      `}</style>
    </>
  );
}
