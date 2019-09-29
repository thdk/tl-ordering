import { IOrderItemState } from "./types";

export function selectOrderItems(state: IOrderItemState, orderId: string) {
    return state.byOrderId[orderId];
}
