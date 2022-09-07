const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/pages"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7086',
        secure: false
    });

    app.use(appProxy);
};
