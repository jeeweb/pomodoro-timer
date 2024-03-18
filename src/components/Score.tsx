import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { roundState, goalState } from "../atoms";
import { MAX_ROUND, MAX_GOAL } from "../constants";

const ScoreBox = styled.div`
  display: flex;
  gap: 2em;
`;

const ScoreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    opacity: 0.7;
    line-height: 2;
  }
`;

function Score() {
  const round = useRecoilValue(roundState);
  const goal = useRecoilValue(goalState);
  return (
    <ScoreBox>
      <ScoreItem>
        <span>
          {round}/{MAX_ROUND}
        </span>
        <span>ROUND</span>
      </ScoreItem>
      <ScoreItem>
        <span>
          {goal}/{MAX_GOAL}
        </span>
        <span>GOAL</span>
      </ScoreItem>
    </ScoreBox>
  );
}

export default Score;
