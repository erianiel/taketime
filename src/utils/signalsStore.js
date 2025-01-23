import { signal } from "@preact/signals-react";
import { SEARCH_TYPE } from "../services/tmdb";

export const selectedId = signal();

export const showType = signal(SEARCH_TYPE.MOVIE);
