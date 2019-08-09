import typescript from "rollup-plugin-typescript";
import tslint from "rollup-plugin-tslint";
import resolve from "rollup-plugin-node-resolve";
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: "src/index.tsx",
    output: {
        name: "tlordering",
        file: "dist/bundle.js",
        format: "iife",
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-redux': 'ReactRedux',
            'redux': 'redux',
            'fetch-mock': 'fetchMock',
            'redux-logger': 'reduxLogger',
        }
    },
    plugins: [
        tslint(),
        replace({
            'process.env.NODE_ENV': `'${process.env.NODE_ENV || "development"}'`,
            'process.env.apiUrl': `'${process.env.apiUrl || "http://api.localhost"}'`
        }),
        resolve(),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                "node_modules/react-is/index.js": ['isContextConsumer', 'isValidElementType'],
                'node_modules/react/index.js': ['useReducer', 'useContext', 'useLayoutEffect', 'memo', 'useDebugValue', 'useMemo', 'useCallback', 'createRef', 'Component', 'PureComponent', 'Fragment', 'Children', 'createElement', 'forwardRef', 'useRef', 'useState', 'useEffect' ],
                'node_modules/react-dom/index.js': ['findDOMNode', 'unstable_batchedUpdates', 'render'],
            }
        }),
        typescript(),
    ]
};