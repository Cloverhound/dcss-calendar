import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { Provider } from "react-redux";
import store from "./store";
declare let module: any

ReactDOM.render(<Provider store={store}><App compiler="Typescript" framework="React..." bundler="Webpack"/></Provider>, 
document.getElementById('root'));
