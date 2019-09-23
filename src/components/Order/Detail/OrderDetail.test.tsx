import React from "react";

import { shallow, ShallowWrapper } from "enzyme";
import { OrderItemList } from "../../OrderItem";
import { OrderDetail } from "./OrderDetail";
import ConnectedOrderItemAdd from "./OrderItemAdd";

describe("OrderDetail rendering", () => {
   const onClick = jest.fn();

   describe("An order with multiple order items", () => {
      let component: ShallowWrapper;

      beforeEach(() => {
         component = shallow(
            <OrderDetail
               onClick={onClick}
               orderId={"o1"}
               order={{
                  customerId: "c1",
                  id: "o1",
                  items: [
                     {
                        unitPrice: 23.01,
                        productId: "B101",
                        quantity: 3,
                     },
                     {
                        unitPrice: 23.01,
                        productId: "B101",
                        quantity: 2,
                     },
                  ],
                  total: 115.05,
               }}
                />,
         );
      });

      it("should match snapshot", () => {
         expect(component.debug()).toMatchSnapshot();
      });

      it("should display the total price for an order", () => {
         expect(
            component.find(".order-detail-total-value").text(),
         ).toEqual("115.05");
      });

      it("should render OrderItemList component", () => {
         const orderItemList = component.find(OrderItemList);
         expect(orderItemList.exists()).toBe(true);

         const { orderId, orderItems } = orderItemList.props();
         // check props passing to orderitemlist
         expect(orderId).toBe("o1");
         expect(orderItems.length).toBe(2);
      });

      it("should render OrderItemAdd component", () => {
         const orderitemadd = component.find(ConnectedOrderItemAdd);
         expect(orderitemadd.exists()).toBe(true);

         const { orderId } = orderitemadd.props();
         expect(orderId).toBe("o1");
      });

      it("should call place order on click", () => {
         component.find(".order-detail-place-order-button").simulate("click");

         expect(onClick).toBeCalled();
      });
   });

   describe("An order with zero order items", () => {
      let component: ShallowWrapper;
      beforeEach(() => {
         component = shallow(
            <OrderDetail
               onClick={jest.fn()}
               orderId={"o1"}
               order={{
                  customerId: "c1",
                  id: "o1",
                  items: [],
                  total: 0,
               }}/>,
         );
      });

      it("should match snapshot", () => {
         expect(component.debug()).toMatchSnapshot();
      });

      it("should display div with class order-detail--empty", () => {
         expect(component.find(".order-detail--empty").exists()).toEqual(true);
      });
   });
});
