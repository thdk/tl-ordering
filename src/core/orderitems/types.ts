export interface IOrderItemDictionary { [orderId: string]: IOrderItem[]; }

export interface IOrderItemState { byOrderId: IOrderItemDictionary; }

export interface IOrderItem {
    readonly productId: string;
    readonly quantity: number;
}

// Types for deserialized api data

export interface IOrderItemData {
    productId: string;
    quantity: number;
    orderId: string;
}

// Types representing data from/for API

interface IApiData {
    [manyProps: string]: any;
}

// "product-id": "B102",
// "quantity": "5",
// "unit-price": "4.99",
// "total": "24.95"
export interface IApiOrderItem extends IApiData {
    quantity: string;
    total: string;
}
