import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { motion, useAnimate } from "framer-motion";
import {
  timeState,
  roundState,
  goalState,
  isPlayingState,
  remainTimeSelector,
} from "../atoms";
import { MAX_MIN, MAX_ROUND, MAX_GOAL } from "../constants";
import { useEffect } from "react";

const TimerBox = styled.div`
  display: flex;
  align-items: center;
`;

const TimerClockItem = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8em;
  height: 2em;
  color: #222222;
  font-family: "Chakra Petch";
  font-weight: 700;
  font-size: 8em;
  background-color: #fff;
  border-radius: 8px;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #222222;
  }
`;

const TimerItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  padding: 0 1em;
  :before,
  :after {
    content: "";
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

function Timer() {
  const isPlaying = useRecoilValue(isPlayingState);
  const [minutes, seconds] = useRecoilValue(remainTimeSelector);
  const round = useRecoilValue(roundState);
  const goal = useRecoilValue(goalState);
  const setTimeState = useSetRecoilState(timeState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const setRoundState = useSetRecoilState(roundState);
  const setGoalState = useSetRecoilState(goalState);
  const [minScope, minAnimate] = useAnimate();
  const [secScope, secAnimate] = useAnimate();

  useEffect(() => {
    minAnimate(minScope.current, {
      rotateX: [0, 360],
    });
  }, [minutes]);

  useEffect(() => {
    secAnimate(secScope.current, {
      rotateX: [0, 360],
    });
  }, [seconds]);

  if (minutes + seconds === 0) {
    setTimeout(() => {
      if (round < MAX_ROUND - 1) {
        setRoundState((prev) => {
          console.log(prev);
          return prev + 1;
        });
      } else if (round === MAX_ROUND - 1 && goal < MAX_GOAL - 1) {
        setRoundState(0);
        setGoalState((prev) => prev + 1);
      } else if (round === MAX_ROUND - 1 && goal === MAX_GOAL - 1) {
        setRoundState(0);
        setGoalState(0);
      }
      setIsPlaying(false);
      setTimeState(MAX_MIN);
    }, 1000);
  }
  //console.log(isPlaying, minutes, seconds);
  return (
    <TimerBox>
      <TimerClockItem ref={minScope}>
        <span>{minutes >= 10 ? minutes : `0${minutes}`}</span>
      </TimerClockItem>
      {isPlaying ? (
        <TimerItem
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      ) : (
        <TimerItem />
      )}

      <TimerClockItem ref={secScope}>
        <span>{seconds >= 10 ? seconds : `0${seconds}`}</span>
      </TimerClockItem>
    </TimerBox>
  );
}

export default Timer;
