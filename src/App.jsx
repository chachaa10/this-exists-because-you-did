import { useRef, useState } from "react";
import "./FlipBook.css";
import { pages } from "./message.js";
import flipSound from "../sounds/one-page-book-flip-101928.mp3";
import music from "../sounds/let-down.mp3";

export default function App() {
  const [current, setCurrent] = useState(0);
  const [musicStarted, setMusicStarted] = useState(false);

  const audioRef = useRef(null);
  const musicRef = useRef(null);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const startMusic = () => {
    musicRef.current.volume = 0.1;
    musicRef.current.loop = true;
    musicRef.current.play().catch((err) => console.log(err));
    setMusicStarted(true);
  };

  const next = () => {
    if (!musicStarted && musicRef.current) {
      startMusic();
    }

    if (current < pages.length) {
      setCurrent(current + 1);
      playFlipSound();
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      playFlipSound();
    }
  };

  return (
    <div className="container">
      <div className="book-wrapper">
        <div className="book">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`page ${index < current ? "flipped" : ""}`}
              style={{ zIndex: pages.length - index }}
            >
              {page.title && <h1 className="title">{page.title}</h1>}
              <p>{page.text}</p>
              <span className="page-number">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="nav-group">
        <button
          onClick={prev}
          disabled={current === 0}
        >
          ‹
        </button>
        <button
          onClick={next}
          disabled={current === pages.length}
        >
          ›
        </button>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef}>
        <source
          src={flipSound}
          type="audio/mpeg"
        />
      </audio>

      <audio ref={musicRef}>
        <source
          src={music}
          type="audio/mpeg"
        />
      </audio>

      {!musicStarted && (
        <button
          onClick={startMusic}
          className="start-music"
        ></button>
      )}
    </div>
  );
}
