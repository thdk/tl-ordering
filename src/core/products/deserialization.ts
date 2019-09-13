import { IApiProduct, IProductData, ProductCategory } from "./types";

export const convertProducts = (apiData: IApiProduct[]): IProductData[] =>
    apiData.map(convertProduct);

export const convertProduct = (apiData: IApiProduct): IProductData => {
    const { price, category, ...rest } = apiData;

    return {
        ...rest,
        price: +apiData.price,
        category: ProductCategory[apiData.category as keyof typeof ProductCategory],
    };
};
