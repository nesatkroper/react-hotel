// import useSound from "./use-sound";
// import success from "@/assets/mp3/success.MP3";

// const ChatSuond = () => {
//   const play = useSound(success);
//   return <></>;
// };

import useSound from "./use-sound";
import success from "@/assets/mp3/success.mp3";

const ChatSound = ({ onRef }) => {
  const play = useSound(success);

  if (onRef) {
    onRef(play);
  }

  return null;
};

export default ChatSound;
