import styled from "styled-components";
import PlayPauseButton from "./components/PlayPauseButton";
import ResetButton from "./components/ResetButton";
import Score from "./components/Score";
import Timer from "./components/Timer";
import { Helmet } from "react-helmet";
import { useRef, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isPlayingState, timeState } from "./atoms";
import { GlobalStyle } from "./components/GlobalStyle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4vh;
  height: 100vh;
  color: #fff;
  background: linear-gradient(135deg, #2b292d, #121113);
`;

const Title = styled.h1`
  font-family: "Saira";
  font-size: 2em;
  font-weight: bold;
`;

export default function App() {
  const isPlaying = useRecoilValue(isPlayingState);
  const setTimeState = useSetRecoilState(timeState);
  const intervalRef = useRef<any>();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeState((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          }
          return prevTime;
        });
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return (
    <Wrapper>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Saira:ital,wght@0,100..900;1,100..900&display=swap"
        />
        <title>Pomodoro Timer</title>
      </Helmet>
      <GlobalStyle />
      <Title>Pomodoro Timer</Title>
      <Timer />
      <PlayPauseButton />
      <ResetButton />
      <Score />
    </Wrapper>
  );
}
