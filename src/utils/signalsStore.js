import { signal } from "@preact/signals-react";
import { SHOW_TYPE } from "./consts";

export const selectedId = signal();

export const showType = signal(SHOW_TYPE.MOVIE);
