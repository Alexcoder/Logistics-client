import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { CreateContext } from './state/context';
import {store} from './state/store';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
     <BrowserRouter>
      <CreateContext>
        <App />
      </CreateContext>
     </BrowserRouter>
   </Provider>  
);

