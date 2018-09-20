import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from './components/Hello';
import { Provider } from "react-redux";
import store from "./store";
declare let module: any

ReactDOM.render(<Provider store={store}><Hello compiler="Typescript" framework="React..." bundler="Webpack"/></Provider>, 
document.getElementById('root'));
