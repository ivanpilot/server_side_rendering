import React from 'react';
import { renderToString } from 'react-dom/server';
//import Home from '../client/components/Home';
import { StaticRouter } from 'react-router-dom';
// On the server side, we use StaticRouter rather than BrowserRouter as we do on the client side. The reason is that the BrowserRouter looks at the url to select which Route component to use but on the server side we do not have any url to look at!! so We use StaticRouter and pass him the url info differently so it knows which component to render.
// The request object of every request hitting the express server contains the url

import { Provider } from 'react-redux';
import Routes from '../client/Routes';

export default (req, store) => {
    //const content = renderToString(<Home />);

    const content = renderToString(
        <Provider store={store} >
            <StaticRouter location={req.path} context={{}}>
                <Routes />
            </StaticRouter>
        </Provider>
    );

    return `
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script src="bundle.js"></script>
            </body>
        </html>
    `
}