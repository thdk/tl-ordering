import { IState } from "../interfaces/state";

export const initialState: Partial<IState> = {
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
    }
}