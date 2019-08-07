import { combineReducers } from 'redux'
import { orders } from './orders';
import { products } from './products';
import { orderItems } from './orderItems';
import { IState } from '../interfaces/state';

const orderingApp = combineReducers<IState>({
    orders,
    orderItems,
    products,
});

export default orderingApp;