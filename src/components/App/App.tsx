import React, { ReactNode, useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { IState } from "../../core/app/types";
import { fetchOrders } from "../../core/orders/actions";
import { getVisibleOrders } from "../../core/orders/reducer";
import { IOrder } from "../../core/orders/types";

interface IPropsFromState {
  orders: IOrder[];
  isLoading: boolean;
}

interface IPropsFromDispatch {
  fetchOrders: () => void;
}

export interface IAppProps {
  children: ReactNode;
}

type Props = IPropsFromState & IPropsFromDispatch & IAppProps;

const App = (props: Props) => {
  const { orders, fetchOrders: fetch, children, isLoading } = props;

  useEffect(() => {
    if (!orders.length) {
      fetch();
    }
  }, []);

  const appJSX = isLoading ? <>LOADING</> : children;
  return (
    <div>
      {appJSX}
    </div>
  );
};

const mapStateToProps = (state: IState): IPropsFromState => {
  return {
    orders: getVisibleOrders(state),
    isLoading: state.orders.isLoading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IPropsFromDispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
