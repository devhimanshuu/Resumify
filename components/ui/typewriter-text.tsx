"use client";
import { useState, useEffect } from "react";

interface TypewriterTextProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
}

export function TypewriterText({
  words,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDelay = 2000,
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));
          if (currentText === word) {
            setTimeout(() => setIsDeleting(true), pauseDelay);
          }
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <span className={className}>
      {currentText}
      <span className="inline-block w-[3px] h-[1em] bg-current ml-1 animate-pulse align-middle" />
    </span>
  );
}
