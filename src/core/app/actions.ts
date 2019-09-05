import { IOrderAction } from "../core/orders/actions";
import { IOrderItemAction } from "./orderItems";

export type AnyAction = IOrderAction | IOrderItemAction;
