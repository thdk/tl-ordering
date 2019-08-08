import { IState } from "../interfaces/state";

export const initialState: Partial<IState> = {
    orders: {
        orders: [{
            id: "1",
            customerId: "1"
        },
        {
            id: "2",
            customerId: "2"
        },
        {
            id: "3",
            customerId: "3"
        }],
        isLoading: false
    },
    orderItems: {
        byOrderId: {
            "1": [
                {
                    productId: "B102",
                    quantity: 10,
                }
            ],
            "2": [
                {
                    productId: "B102",
                    quantity: 5,
                }
            ],
            "3": [
                {
                    productId: "A101",
                    quantity: 2,
                },
                {
                    productId: "A102",
                    quantity: 1,
                }
            ]
        }
    },
    products: {
        byId: {
            "B102": {
                unitPrice: 10,
                id: "B102"
            },
            "B202": {
                unitPrice: 10,
                id: "B202"
            },
            "B303": {
                unitPrice: 3.3,
                id: "B303",
            },
            "A102": {
                unitPrice: 7.3,
                id: "A102",
            },
            "A101": {
                unitPrice: 22.45,
                id: "A101"
            }
        },
        allIds: ["B102", "B202", "B303", "A101", "A102"]
    },
    ui: {
        isLoading: false,
    }
}