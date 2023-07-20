import store from "../redux/store.ts";
import { getParse } from "./getParse.ts";

export function getStoreCardItem(id: string) {
  const {
    cards: { items: item },
  }: any = store.getState();
  const isItem = Object.keys(item).length === 0;
  if (isItem) return null;
  return {
    id,
    parse: getParse(item[id]),
  };
}
