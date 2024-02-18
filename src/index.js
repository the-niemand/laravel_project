import React from 'react';
import ReactDOM from 'react-dom/client';
import Authentication from './inputs/authentification';
import { Provider } from 'react-redux';
import { store } from './inputs/reducer';
import Jobs from './home page/jobs.jsx/jobs';
import Talents from './home page/talents/talents';
import Profilepage from './profilepage/profilepage';
import Image from './inputs/image';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Test from './test';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <Test /> */}
    <App />
  </Provider>
);

