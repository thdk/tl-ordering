import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./core/app/reducer";
import { IState } from "./core/app/types";

export function configureStore(initialState: Partial<IState>) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            logger, // TODO: only add logger middleware in development
        ),
    );
}
