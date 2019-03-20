//const express = require('express');
//const React = require('react');
//const renderToString = require('react-dom/server').renderToString;
//const Home = require('./client/components/Home').default;

import express from 'express';
//import React from 'react';
//import { renderToString } from 'react-dom/server';
//import Home from './client/components/Home';
import renderer from './helpers/renderer';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(renderer(req));
    // We pass the req object to the renderer function so that the StaticRouter knows which url the user is trying to access and so which component must be rendered
})

app.listen(3000, () => {
    console.log('listening on PORT 3000')
})