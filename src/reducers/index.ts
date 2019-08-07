import { combineReducers } from 'redux'
import { orders } from './orders';
import { products } from './products';
import { orderItems } from './orderItems';
import { IState } from '../interfaces/state';
import { ui } from './ui';

const orderingApp = combineReducers<IState>({
    orderItems,
    orders,
    products,
    ui
});

export default orderingApp;