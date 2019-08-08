import React, { useEffect, ReactNode } from 'react';
import OrderList from './OrderList';
import { IOrder } from '../interfaces/orders';
import { ThunkDispatch } from 'redux-thunk';
import { fetchOrders } from '../actions/orders';
import { connect } from 'react-redux';
import { IState } from '../interfaces/state';

type PropsFromState = {
  orders: IOrder[];
  isLoading: boolean;
};

type PropsFromDispatch = {
  fetchOrders: () => void;
}

export interface IAppProps {
  children: ReactNode;
}

type Props = PropsFromState & PropsFromDispatch & IAppProps;

const App = (props: Props) => {
  const { orders, fetchOrders, children, isLoading } = props;

  if (!orders.length)
    useEffect(() => {
      fetchOrders()
    }, []);

  const appJSX = isLoading ? <>LOADING</> : children;
  return (
    <div>
      {appJSX}
    </div>
  );
};

const mapStateToProps = (state: IState): PropsFromState => {
  return {
    orders: state.orders.orders,
    isLoading: state.orders.isLoading
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): PropsFromDispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);