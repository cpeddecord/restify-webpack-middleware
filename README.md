# Restify Webpack Middleware

Just a thin wrapper around [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware) and [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware) for use with [Restify](https://github.com/restify/node-restify).

### `configureWebpackMiddleware()`

```
configureWebpackMiddleware(compiler, devConfig, hotConfig);
```

Pass your compiled Webpack config along with standard configuration objects from both Dev and Hot Middlewares and you'll receive two middlwares back, `webpackDevMiddleware` and `webpackHotMiddleware`. `webpackDevMiddleware` can be used with a standard middleware signature where `webpackHotMiddleware` needs to be used in conjunction with a `server.get('path/to/hmr', webpackHotMiddleware)` signature.

```
import restify from 'restify';
import webpack from 'webpack';
import configureWebpackMiddleware from 'restify-webpack-middleware';

import webpackConfig from './path/to/your/webpack.config';

const server = restify.createServer({ ... });

const compiler = webpack(webpackConfig);

const devMiddlewareConfig = {
  webpackConfig,
  publicPath: webpackConfig.output.publicPath,
};

const hotMiddlewareConfig = {
  log: console.log,
  path: '/__webpack_hmr',
};

const { webpackDevMiddleware, webpackHotMiddleware } = configureWebpackMiddleware(
  compiler,
  webpackDevConfig,
  webpackHotConfig
);

server.use(webpackDevMiddleware);
server.get(webpackHotConfig.path, webpackHotMiddleware);
```
