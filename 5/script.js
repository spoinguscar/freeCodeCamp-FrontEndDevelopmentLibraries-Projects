import React, { useState, useEffect, useRef } from "https://esm.sh/react@16";
import ReactDOM from "https://esm.sh/react-dom@16";

function PomodoroClock() {
  // State values.
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState("Session"); // "Session" or "Break"

  const audioRef = useRef(null);

  // Main effect: decrement time each second only if timeLeft > 0.
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) return; // Let the other effect handle zero

    const timer = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  // Zero effect: when timer hits 0, play sound and after a delay, switch modes.
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      // Play the beep.
      audioRef.current.play();

      // Delay mode switch for 1 second so 00:00 is visible and audio plays.
      const timeout = setTimeout(() => {
        if (currentMode === "Session") {
          setCurrentMode("Break");
          setTimeLeft(breakLength * 60);
        } else {
          setCurrentMode("Session");
          setTimeLeft(sessionLength * 60);
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft, isRunning, currentMode, breakLength, sessionLength]);

  // Toggle start/pause.
  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  // Reset everything to default.
  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setCurrentMode("Session");
    setTimeLeft(25 * 60);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Handlers for adjusting break and session lengths.
  const decrementBreak = () => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  const incrementBreak = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      const newSession = sessionLength - 1;
      setSessionLength(newSession);
      if (!isRunning && currentMode === "Session") {
        setTimeLeft(newSession * 60);
      }
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      const newSession = sessionLength + 1;
      setSessionLength(newSession);
      if (!isRunning && currentMode === "Session") {
        setTimeLeft(newSession * 60);
      }
    }
  };

  // Helper: Format seconds into mm:ss.
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  return (
    <div id="pomodoro-clock" className="container">
      <h1>25 + 5 Clock</h1>
      <div className="row">
        <div className="col">
          <div id="break-label">Break Length</div>
          <button id="break-decrement" onClick={decrementBreak}>
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={incrementBreak}>
            +
          </button>
        </div>
        <div className="col">
          <div id="session-label">Session Length</div>
          <button id="session-decrement" onClick={decrementSession}>
            -
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={incrementSession}>
            +
          </button>
        </div>
      </div>
      <div className="timer">
        <div id="timer-label">{currentMode}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
      <div className="controls">
        <button id="start_stop" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio
        id="beep"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
      ></audio>
    </div>
  );
}

ReactDOM.render(<PomodoroClock />, document.getElementById("app"));
