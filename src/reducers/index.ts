import { combineReducers } from 'redux'
import { orders } from './orders';
import { orderItems } from './orderItems';

const orderingApp = combineReducers<any, any>({
    orders: orders,
    orderItems: orderItems
});

export default orderingApp;