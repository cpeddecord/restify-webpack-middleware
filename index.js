const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = function registerWebpackMiddlewareForRestify(restifyApp, config) {
  const devMiddlewareInstance = webpackDevMiddleware(config.compiler, config.webpackDevConfig);
  const hotMiddlewareInstance = webpackHotMiddleware(config.compiler, config.webpackHotConfig);

  function webpackDevMiddlewareForRestify(req, res, next) {
    // stub restify methods as used within `webpack-dev-middleware`
    const restifyTransport = {
      setHeader(key, val) {
        res.setHeader(key, val);
      },
      send(content) {
        res.charSet('utf-8');
        res.writeHead(this.statusCode || 200, {
          'Content-Length': Buffer.byteLength(content),
          'Content-Type': 'application/json',
        });
        res.write(content);
        res.end();
      },
      end() {
        return;
      },
    };

    devMiddlewareInstance(req, restifyTransport, next);
  }

  restifyApp.use(webpackDevMiddlewareForRestify);
  restifyApp.get(config.hotConfig.path, hotMiddlewareInstance);
}
