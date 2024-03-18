import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isPlayingState } from "../atoms";
import { motion } from "framer-motion";
import { IconPause } from "./icons/IconPause";
import { IconPlay } from "./icons/IconPlay";

const PlayBtn = styled(motion.button)`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.6em;
  height: 3.6em;
  background-color: rgba(60, 57, 63, 0.8);
  border: 0;
  border-radius: 50%;
`;

const buttonVariants = {
  hover: { scale: 1.2 },
  click: { scale: 1 },
};

function PlayPauseButton() {
  const isPlaying = useRecoilValue(isPlayingState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const togglePlayPause = () => setIsPlaying((prev) => !prev);
  return (
    <PlayBtn
      onClick={togglePlayPause}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="click"
    >
      {isPlaying ? <IconPause /> : <IconPlay />}
    </PlayBtn>
  );
}

export default PlayPauseButton;
