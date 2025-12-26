import { useState } from "react";
import "./FlipBook.css";

const pages = [
  {
    title: "Still Here",
    text: "This exists because one person mattered more than she knows.",
  },
  {
    text: "There were days when everything felt heavy. Thinking felt slow. Hope felt distant.",
  },
  {
    text: "You didn’t fix my life. You didn’t promise anything. You were just there.",
  },
  {
    text: "Somehow, that was enough. Knowing you existed made the weight lighter.",
  },
  {
    text: "This is not a burden. This is gratitude.",
  },
];

export default function FlipBook() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < pages.length) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
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
              {page.title && <h1>{page.title}</h1>}
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
    </div>
  );
}
