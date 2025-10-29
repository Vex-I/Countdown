import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';

const Countdown = ({targetDate, usingHoursFormat, setCountdownArgs, setIsOpeningAct}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isNew, setIsNew] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    if (usingHoursFormat) {
      setTimeLeft({
        days: 0,
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }
  }

  // Triggers time update whenever 
  useEffect(() => {
    calculateTimeLeft(); 
    const timer = setInterval(() => {
        calculateTimeLeft();
        setIsNew(true);
        setTimeout(() => setIsNew(false), 300);
    }, 1000);
    return () => clearInterval(timer);
  }, [usingHoursFormat, targetDate]);

  function toggleFormat() {
    setCountdownArgs({
      targetDate: targetDate, 
      usingHoursFormat: usingHoursFormat ? false : true
    });
  };

  return (
    <div className="countdown">
      <h1 style={{fontSize:"4rem"}}>Countdown to {targetDate.toDateString()} </h1>
      <div className={`slide ${isNew ? "new" : ""}`} style={{fontSize:"2rem"}}>
        <h3 style={{visibility: usingHoursFormat ? "hidden" : "", color: "var(--color-primary)"}}>
            {timeLeft.days} Days
        </h3>
        <h2>{timeLeft.hours} Hours {timeLeft.minutes} Minutes {timeLeft.seconds} Seconds</h2>
      </div>
      <div className="button-container">
        <button className="ui-button" onClick={toggleFormat}>
          Switch to {usingHoursFormat ? "Days/Hours" : "Total Hours"}
        </button>
        <div style={{position: "relative"}}>
          <button className="ui-button" style={{width: "100%"}} onClick={() => setIsOpenCalendar(x => !x)}>
            Edit Date
          </button>
          <div className="input-calendar" style={{display: isOpenCalendar ? "inline" : "none"}}>
            <Calendar onChange={(value, event) => setCountdownArgs({targetDate: value, usingHoursFormat: usingHoursFormat})}/>
          </div>
        </div>
        <button className="ui-button" onClick={() => setIsOpeningAct(x => !x)}>
            Record Activity
        </button>
      </div>
    </div>
  );
};

export default Countdown;
