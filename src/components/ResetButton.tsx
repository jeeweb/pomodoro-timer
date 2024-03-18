import styled from "styled-components";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { MAX_MIN } from "../constants";
import { isPlayingState, timeState } from "../atoms";

const ResetBtn = styled(motion.button)`
  padding: 4px 12px;
  border: 0;
  border-radius: 8px;
  background-color: rgba(60, 57, 63, 0.8);
`;

const buttonVariants = {
  hover: { backgroundColor: "#fff", color: "#121113" },
  click: { scale: 0.8 },
};

function ResetButton() {
  const setTimeState = useSetRecoilState(timeState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const handleReset = () => {
    setTimeState(MAX_MIN);
    setIsPlaying(false);
  };
  return (
    <ResetBtn
      onClick={handleReset}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="click"
    >
      Reset
    </ResetBtn>
  );
}

export default ResetButton;
