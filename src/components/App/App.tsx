import React, { ReactNode, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { getIsLoading } from "../../core/app/selectors";
import { IState } from "../../core/app/types";
import { fetchOrders as fetchOrderAction } from "../../core/orders/actions";
import { fetchProducts as fetchProductsAction } from "../../core/products/actions";

export interface IAppProps {
  children: ReactNode;
}

type Props = StateProps & DispatchProps & IAppProps;

export const App = (props: Props) => {
  const { children, isLoading, fetchOrders, fetchProducts } = props;

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const appJSX = isLoading ? <span data-testid="app-loading">LOADING</span> : children;
  return (
    <div>
      {appJSX}
    </div>
  );
};

type StateProps = ReturnType<typeof mapStatetoProps>;

const mapStatetoProps = (state: IState) => ({
  isLoading: getIsLoading(state),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchProducts: fetchProductsAction,
      fetchOrders: fetchOrderAction,
    },
    dispatch,
  );

export default connect(mapStatetoProps, mapDispatchToProps)(App);
