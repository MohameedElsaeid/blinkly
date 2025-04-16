const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.VITE_API_URL || 'https://api.blinkly.app',
            changeOrigin: true,
            secure: true,
            pathRewrite: {'^/api': ''},
            headers: {
                'X-Forwarded-Proto': 'https',
                'X-Forwarded-Host': 'blinkly.app'
            }
        })
    );
};
