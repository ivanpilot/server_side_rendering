// Entry point for the client side of the app
import React from 'react';
import ReactDOM from 'react-dom';
//import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.hydrate(
    //<Home />,
    <BrowserRouter>
        <Routes /> 
    </BrowserRouter>,
    document.querySelector('#root')
);