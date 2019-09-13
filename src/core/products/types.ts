export interface IProductDictionary { [productId: string]: IProduct; }

export interface IProductState {
    byId: IProductDictionary;
    allIds: string[];
    isLoading: boolean;
}

export enum ProductCategory {
    "unknown" = 0,
    "tools" = 1,
    "electronics" = 2,
}

export interface IProduct {
    readonly id: string;
    readonly description: string;
    readonly category: ProductCategory;
    readonly price: number;
}

// Types for deserialized api data

export interface IProductData {
    readonly id: string;
    readonly description: string;
    readonly category: ProductCategory;
    readonly price: number;
}

// Types representing data from/for API

export interface IApiProduct {
    readonly id: string;
    readonly description: string;
    readonly category: string;
    readonly price: string;
}
