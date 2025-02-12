import { signal } from "@preact/signals-react";
import { SHOW_TYPE, TIME_UNITS } from "./consts";

export const selectedId = signal();

export const showType = signal(SHOW_TYPE.MOVIE);

export const completionDateData = signal({
  time: 1,
  unit: TIME_UNITS.HOUR,
  cadence: TIME_UNITS.DAY,
});
