import { useState, useEffect } from "react";

export const Countdown = () => {
  let countdownTimeOut;

  const [time, setTime] = useState(1 * 60);
  const [start, setStart] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  useEffect(() => {
    if (start && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  return (
    <div className="flex flex-row font-montserrat text-7xl">
      <div>
        <span>{minuteLeft}</span>
        <span>{minuteRight}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondLeft}</span>
        <span>{secondRight}</span>
      </div>
    </div>
  );
};