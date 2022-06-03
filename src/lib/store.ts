import { reactive, readonly, watchEffect } from "vue";
import { fetcher } from "./spotify";

const initValues = {
  query: "",
  currentShow: "",
  shows: [],
  market: "US",
};

type Keys = keyof typeof initValues;
type Values = typeof initValues[Keys];

// interface MyStore {
//   query: string;
//   currentShow: string;
//   shows: Partial<SpotifyApi.ShowObject>[];
//   market: string;
//   set: (key: Keys, value: Values) => void;
// }

export const state = reactive({
  set(key: Keys, value: Values) {
    this[key] = value as never;
  },
  ...initValues,
});

const copy = readonly(state);

watchEffect(async () => {
  const params = [
    "type=show",
    `q=${copy.query}`,
    `market=${copy.market}`,
    "limit=3",
  ];

  if (copy.query) {
    const data = await fetcher(`search?${params.join("&")}`);
    state.shows = data["shows"]["items"];
  }
});
