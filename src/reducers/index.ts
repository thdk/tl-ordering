import { combineReducers } from 'redux'
import { orders } from './orders';
import { orderItems } from './orderItems';

const orderingApp = combineReducers({
    orders,
    orderItems
});

export default orderingApp;