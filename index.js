const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

export default function registerWebpackMiddlewareForRestify(compiler, devConfig, hotConfig) {
  const devMiddlewareInstance = webpackDevMiddleware(compiler, devConfig);
  const hotMiddlewareInstance = webpackHotMiddleware(compiler, hotConfig);

  function webpackDevMiddlewareForRestify(req, res, next) {
    // stub restify methods as used within `webpack-dev-middleware`
    const restifyTransport = {
      setHeader(arguments) {
        res.setHeader(arguments);
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

  function webpackHotMiddlewareForRestify(req, res, next) {
    hotMiddlewareInstance(req, res, next);
  }

  return {
    webpackDevMiddleware: webpackDevMiddlewareForRestify,
    webpackHotMiddleware: webpackHotMiddlewareForRestify,
  };
}
