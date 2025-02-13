import { useRef } from "react";

const useSound = (soundFile) => {
  const audioRef = useRef(new Audio(soundFile));

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return playSound;
};

export default useSound;
