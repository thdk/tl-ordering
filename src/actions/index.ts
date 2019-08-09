import { IOrderItemAction } from "./orderItems";
import { IOrderAction } from "./orders";

export type AnyAction = IOrderAction | IOrderItemAction;
