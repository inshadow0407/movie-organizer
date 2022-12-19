import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { store } from "./store/store";
import { BrowserRouter } from 'react-router-dom';

import {App} from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  rootElement
);
