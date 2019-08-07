interface IApiData {
    [manyProps: string]: any
}

// "id": "2",
// "customer-id": "2",
// "items": [
//   {
//     "product-id": "B102",
//     "quantity": "5",
//     "unit-price": "4.99",
//     "total": "24.95"
//   }
// ],
// "total": "24.95"
export interface IApiOrder extends IApiData {
    id: string,
    items: IApiOrderItem[];
    total: string;
};

// "product-id": "B102",
// "quantity": "5",
// "unit-price": "4.99",
// "total": "24.95"
export interface IApiOrderItem extends IApiData {
    quantity: string;
    total: string;
}

export interface IApiProduct extends IApiData {};

export interface IPlaceOrderResult extends IApiData {
    result: string;
    order?: IApiOrder;
    reason?: string;
}