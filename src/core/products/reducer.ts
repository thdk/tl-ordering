import { IProductState } from "./types";

export function products(state: IProductState = { byId: {}, allIds: [] }) {
    return state;
}
