import { IProductState } from "../interfaces/state";

export function products(state: IProductState = { byId: {}, allIds: [] }) {
    return state;
}