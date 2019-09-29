import { IApiOrderItem, IOrderItemData } from "../orderitems/types";

export interface IOrderState {
    byId: IOrderDictionary;
    visibleIds: string[];
    isLoading: boolean;
}

export interface IOrderDictionary { [orderId: string]: IOrder; }

export interface IOrder {
    readonly id: string;
    readonly customerId: string;
    readonly isPlaced?: boolean;
}

// Types for deserialized api data

export interface IOrderData {
    id: string;
    items: IOrderItemData[];
    customerId: string;
}

export interface IPlaceOrderData {
    success: boolean;
    order: IOrderData;
    reason?: string;
}

// Types representing data from/for API

interface IApiData {
    [manyProps: string]: any;
}

// {
//  "id": "2",
//   "customer-id": "2",
//   "items": [
//     {
//       "product-id": "B102",
//       "quantity": "5",
//       "unit-price": "4.99",
//       "total": "24.95"
//     }
//   ],
//   "total": "24.95"
// }
export interface IApiOrder extends IApiData {
    id: string;
    items: IApiOrderItem[];
    total: string;
}

export interface IApiPlaceOrderResult extends IApiData {
    result: string;
    order: IApiOrder;
    reason?: string;
}
