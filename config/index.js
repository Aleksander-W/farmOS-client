'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const { Console } = require('console');

module.exports = {
  dev: {
    mode: 'development',

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxy: [{
      logLevel: 'debug',
      context: [
        '/'
      ],
      target: 'http://localhost:80',
      changeOrigin: true,
      secure: false,
      // Clear invalid cookies in the header of POST and PUT req's so they don't 403.
      // See https://www.drupal.org/project/restws_oauth2_server/issues/3159405
      onProxyReq(proxyReq) {
        const headersSymbol = Object.getOwnPropertySymbols(proxyReq)
          .filter(s => s.toString() === 'Symbol(kOutHeaders)')[0];
        if (headersSymbol && proxyReq[headersSymbol].host.some(h => h.includes('localhost'))) {
          console.log(`Clearing cookie on ${proxyReq.method} request to ${proxyReq.path}`)
          delete proxyReq[headersSymbol].cookie;
        }
      },
    }],

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  web: {
    mode: 'production',

    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  native: {
    mode: 'production',
    env: require('./native.env'),
    index: path.resolve(__dirname, '../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
  }
}
