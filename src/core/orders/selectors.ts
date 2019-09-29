import { IOrder, IOrderState } from "./types";

export function selectOrder(state: IOrderState, id: string): IOrder | null {
    const order = state.byId[id];
    if (!order) {
        return null;
    }

    return order;
}

export function selectVisibleOrders(state: IOrderState) {
    return state.visibleIds
        .map(id => selectOrder(state, id))
        .filter(o => !!o) as IOrder[];
}

export function selectIsLoading(state: IOrderState) {
    return state.isLoading;
}
