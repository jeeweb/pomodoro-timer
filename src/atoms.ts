import { atom, selector } from "recoil";
import { MAX_MIN, MAX_SEC } from "./constants";

export const isPlayingState = atom({
  key: "isPlaying",
  default: false,
});

export const timeState = atom({
  key: "timeState",
  default: MAX_MIN,
});

export const roundState = atom({
  key: "roundState",
  default: 0,
});

export const goalState = atom({
  key: "goalState",
  default: 0,
});

export const remainTimeSelector = selector({
  key: "remainTimeSelector",
  get: ({ get }) => {
    const currentTime = get(timeState);
    const remainMin = Math.floor(currentTime / MAX_SEC);
    const remainSec = Math.round(currentTime % MAX_SEC);
    return [remainMin, remainSec];
  },
});
