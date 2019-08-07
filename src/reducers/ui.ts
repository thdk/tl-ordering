import { IUiState } from "../interfaces/state";
import { IOrderAction } from "../actions/orders";

export const ui = (state: IUiState = { isLoading: false }, action: IOrderAction) => {
    switch (action.type) {
        case "FETCH_ORDERS_REQUEST": {
            const newState = {
                ...state,
                isLoading: true
            };
            return newState;
        }
        case "FETCH_ORDERS_FAILURE":
        case "FETCH_ORDERS_SUCCESS": {
            const newState = {
                ...state,
                isLoading: false
            };
            return newState;
        }
        default:
            return state;
    };
};