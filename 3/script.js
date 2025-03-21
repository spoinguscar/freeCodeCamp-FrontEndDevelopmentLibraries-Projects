import React, { useState, useEffect, useRef } from "https://esm.sh/react@16";
import ReactDOM from "https://esm.sh/react-dom@16";

const drumPads = [
  {
    key: "Q",
    sound: "Heater 1",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
  },
  {
    key: "W",
    sound: "Heater 2",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
  },
  {
    key: "E",
    sound: "Heater 3",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
  },
  {
    key: "A",
    sound: "Heater 4",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
  },
  {
    key: "S",
    sound: "Clap",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
  },
  {
    key: "D",
    sound: "Open HH",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    sound: "Kick-n-Hat",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
  },
  {
    key: "X",
    sound: "Kick",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
  },
  {
    key: "C",
    sound: "Closed HH",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
  },
];

function DrumMachine() {
  const [display, setDisplay] = useState("Spoingus");

  // Create refs for each audio element
  const audioRefs = useRef({});

  // Handle key press event
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      const drumPad = drumPads.find((pad) => pad.key === key);
      if (drumPad) {
        // Use ref to access the audio element and play it
        const audio = audioRefs.current[key];
        if (audio) {
          audio.play();
          setDisplay(drumPad.sound);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Handle button click
  const handleClick = (key) => {
    const drumPad = drumPads.find((pad) => pad.key === key);
    const audio = audioRefs.current[key];
    if (audio) {
      audio.play();
      setDisplay(drumPad.sound);
    }
  };

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div id="pads">
        {drumPads.map((pad) => (
          <button
            className="drum-pad"
            id={pad.key}
            onClick={() => handleClick(pad.key)}
            key={pad.key}
          >
            {pad.key}
            <audio
              ref={(el) => (audioRefs.current[pad.key] = el)}
              className="clip"
              id={pad.key}
              src={pad.src}
            ></audio>
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
