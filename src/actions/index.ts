import { IOrderAction } from "./orders";
import { IOrderItemAction } from "./orderItems";

export type AnyAction = IOrderAction | IOrderItemAction;