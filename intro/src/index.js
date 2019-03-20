//const express = require('express');
//const React = require('react');
//const renderToString = require('react-dom/server').renderToString;
//const Home = require('./client/components/Home').default;

import express from 'express';
//import React from 'react';
//import { renderToString } from 'react-dom/server';
//import Home from './client/components/Home';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

/*********************************************** */
// On the server side we need to carefully execute operations before rendering anything that is before calling renderer() function.
// Even though we are doing SSR, even on the server side assuming we need a redux store and we need to fetch data to populate our html file that will be rendered we will do all this before rendering anything
// Unlike with react which happens inside the browser and which take  care of concurrency / competition race, on the server side we must determine when all the required fetching and store update is finshed so ONLY THEN we can serve our html by calling the renderer() function. This is also the reason why on the server side we do not call the <Provider /> component as this will trigger that we are ready to render our html.
// Given the above, we are going to create the store inside the index.js file before calling the renderer() funciton so we know so the store will be already ready to fetch and be populated
// It is ONLY AFTER the store is created, the data are fetched and the store is populated that we will call renderer()
/*********************************************** */
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    const store = createStore();


    res.send(renderer(req));
    // We pass the req object to the renderer function so that the StaticRouter knows which url the user is trying to access and so which component must be rendered
})

app.listen(3000, () => {
    console.log('listening on PORT 3000')
})