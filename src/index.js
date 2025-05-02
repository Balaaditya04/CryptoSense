// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';

// import App from './App';
// import store from './app/store';
// import 'antd/dist/reset.css';

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(

//   <Router>
//     <Provider store={store}>
//     <App />
//     </Provider>
//   </Router>,
//   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from "./routes";


import App from './App';
import store from './app/store';
import 'antd/dist/reset.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); 

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

