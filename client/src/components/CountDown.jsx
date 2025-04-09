import React, { useState ,useEffect } from 'react'

const CountDown = ({ minutes = 1 }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60); // time in seconds

    useEffect(() => {
      if (timeLeft === 0) return;
  
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft]);
  
    const formatTime = () => {
      const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
      const s = String(timeLeft % 60).padStart(2, '0');
      return `${m}:${s}`;
    };
  
    return (
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold text-green-700">
          ⏳ Time Remaining: {formatTime()}
        </h2>
      </div>
    );
}

export default CountDown
