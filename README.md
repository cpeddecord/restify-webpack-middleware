# Restify Webpack Middleware

Just a thin wrapper around [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware) and [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware) for use with [Restify](https://github.com/restify/node-restify).

### `configureWebpackMiddleware()`

```
registerWebpackMiddleware(restifyInstance, { compiler, webpackDevConfig, webpackHotConfig });
```

Pass the instance of your Restify server along with the compiled Webpack config and the standard configuration objects from both Dev and Hot Middlewares and presto/chango/whamo you'll have some hot-dev middleware action.

```
import restify from 'restify';
import webpack from 'webpack';
import registerWebpackMiddleware from 'restify-webpack-middleware';

import webpackConfig from './path/to/your/webpack.config';

const server = restify.createServer({ ... });

const compiler = webpack(webpackConfig);

const webpackDevConfig = {
  webpackConfig,
  publicPath: webpackConfig.output.publicPath,
};

const webpackHotConfig = {
  log: console.log,
  path: '/__webpack_hmr',
};

registerWebpackMiddleware(
  restifyApp,
  {
    compiler,
    webpackDevConfig,
    webpackHotConfig,
  }
);
```
