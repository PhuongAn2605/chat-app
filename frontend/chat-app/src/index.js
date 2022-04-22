// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { Provider } from 'react-redux';

// import store from './redux/configureStore';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React>

// );

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

import { Provider } from 'react-redux';

import store from './redux/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);