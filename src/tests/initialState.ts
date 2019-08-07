import { IState } from "../interfaces/state";

export const initialState: IState = {
    orders: {
        orders: [
            {
                id: "1",
                customerId: "1",
                total: 109.90
            },
            {
                id: "2",
                customerId: "13",
                total: 49.90
            }
        ],
        isLoading: false
    },
    orderItems: {
        byOrderId: {
            "1": [{
                productId: "B102",
                quantity: 10,
            },
            {
                productId: "B202",
                quantity: 20,
            }],
            "2": [{
                productId: "B102",
                quantity: 1,
            }]
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
            }
        },
        allIds: ["B102", "B202"]
    },
    ui: {
        isLoading: false,
    }
}