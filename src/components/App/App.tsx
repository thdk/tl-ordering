import React, { ReactNode, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { getIsLoading } from "../../core/app/reducer";
import { IState } from "../../core/app/types";
import { fetchOrders } from "../../core/orders/actions";
import { getVisibleOrders } from "../../core/orders/reducer";
import { fetchProducts } from "../../core/products/actions";

export interface IAppProps {
  children: ReactNode;
}

type Props = IAppProps;

export const App = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, []);

  const isLoading = useSelector((state: IState) => getIsLoading(state));

  const appJSX = isLoading ? <>LOADING</> : children;
  return (
    <div>
      {appJSX}
    </div>
  );
};
