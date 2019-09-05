export interface IProductDictionary { [productId: string]: IProduct; }

export interface IProductState { byId: IProductDictionary; allIds: string[]; }

export interface IProduct {
    id: string;
    unitPrice: number;
}

// Types representing data from/for API

interface IApiData {
    [manyProps: string]: any;
}

export interface IApiProduct extends IApiData {}
