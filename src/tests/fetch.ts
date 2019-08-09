export type Match = string | RegExp | ((input: RequestInfo) => boolean);
export interface IFetchRoute<T> { match: Match; response: T; }

const findRoute = <T>(mocks: Array<IFetchRoute<T>>, input: RequestInfo) => {
    // TODO: add support for function, regexp
    return mocks.find((m) => m.match === input);
};

export interface IMockedFetch {
    add: <T extends object>(match: Match, response: T) => void;
}

/**
 * WIP notice: Not feature complete yet.
 * Allows to override global fetch method to fake api calls
 * @param mocks Array with mocked routes.
 * If no mocked route is found it will fallback to default fetch implementation.
 */
export const mockFetch = (mocks: Array<IFetchRoute<any>> = []): IMockedFetch => {
    // Keep original fetch implementation
    const standardFetch = window.fetch;

    window.fetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        const route = findRoute(mocks, input);
        if (route) {
            return new Promise<any>((resolve) => {
                if (typeof route.response === "function") {
                    resolve(new Response(JSON.stringify(route.response(init))));
                }

                resolve(new Response(JSON.stringify(route.response)));
            }).then((result) => {
                return result.clone().json().then((data: any) => {
                    const style = "color: green; display: block; font-weight:bold;";
                    console.log("%cFetch is mocked!", style);
                    console.log("%cFetching:\t", style, input);
                    console.log("%cRequest:\t", style,
                        init && typeof init.body === "string"
                            ? JSON.parse(init.body)
                            : "-");
                    console.log("%cResponse:\t", style, data);

                    return result;
                });
            });
        }

        // fallback to original fetch implementation
        return standardFetch(input, init);
    };

    return {
        add: <T extends object>(match: Match, response: T) => mocks.push({ match, response }),
    };
};
