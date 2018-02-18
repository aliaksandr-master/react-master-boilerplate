/* eslint-env node */

const path = require('path');
const transform = require('lodash/transform');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackProgress = require('webpack-tiny-progress');
const eslintFormatter = require('eslint/lib/formatters/codeframe');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const environments = require('./dev/target.json');
const options = require('./dev/config');
const getEntries = require('./dev/utils/get-entries');



const entries = getEntries(options);



const DIR_BABEL_CACHE_DIR = path.resolve(options.CWD, options.DIR_BABEL_CACHE_DIR);



const config = {};



config.output = {
  path: `${options.CWD}/${options.DIR_RELEASE}`,
  pathinfo: !options.MINIFY,
  filename: '[name].js'
};



config.entry = entries
  .reduce((entry, { name, fileJs }) => {
    entry[name] = [ fileJs ];

    return entry;
  }, {});



config.externals = { // See http://webpack.github.io/docs/library-and-externals.html
};



config.module = {};



config.module.noParse = [
  /\.min\.js$/,
  /\/node_modules\/(raven-js|clipboard|localforage)\//,
  /scsslint_tmp[^.]+\.js/,
  /\/__tests__\//
  // /\/vendor\/[^/]+\/lib\/(?!Modernizr\.js|Detectizr\.js)/
];


const NODE_MODULES = /\/node_modules\//;
const VENDOR = /\/vendor\//;
const VENDOR_LIB = /\/vendor\/[^/]+\/lib\//;
const JS_FILES = /\.(?:jsx?)(?:\?.*)?$/;
const JSON_FILES = /\.(?:json)(?:\?.*)?$/i;
const FONT_FILES = /\.(?:eot|ttf|woff|woff2)(?:\?[a-z0-9]*)?$/i;
const BITMAP_IMAGES = /\.(?:png|jpg|gif)(?:\?.*)?$/i;
const SVG_FILES = /\/[a-z][^/]+?\.(?:svg)(?:\?.*)?$/;
const SVG_COMPONENT_FILES = /\/[A-Z][a-zA-Z0-9_]+\.(?:svg)(?:\?.*)?$/;

config.module.rules = [
  options.DEV_LINTING_ENABLED ? {
    enforce: 'pre',
    test: JS_FILES,
    loader: 'eslint-loader',
    exclude: [
      NODE_MODULES,
      VENDOR,
      /\/__tests__\//,
      /\.sandbox\.js/
    ],
    options: {
      emitWarning: true,
      cache: true,
      cacheLocation: options.ESLINT_CACHE_FILE,
      formatter: eslintFormatter
    }
  } : null,
  options.ENV === environments.PROD ? null : {
    enforce: 'post',
    test: /\/react-dom\/lib\/ReactCompositeComponent\.js/,
    loader: path.resolve(__dirname, './dev/webpack-add-patch-for-react-dom-try-loader/index.js')
  },
  {
    test: JS_FILES,
    exclude: [
      /\/node_modules\/(?!react\/lib\/|constantin\/|str-map\/|react-composite-router\/|dom-tricks\/|react-fractal-field\/|get-own-enumerable-property-symbols\/|stringify-object\/|react-updating-hoc\/|multi-routing-api\/|react-redux-self\/|normalizr\/)/,
      VENDOR_LIB
    ],
    use: [
      //{
      //  loader: 'react-hot-loader/webpack'
      //},
      //{
      //  loader: 'log-loader'
      //},
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: DIR_BABEL_CACHE_DIR
        }
      }
    ]
  },
  {
    test: /\.(?:less)(?:\?.*)?$/i,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader'
        }
      ],
      publicPath: '../'
    })
  },
  {
    test: JSON_FILES,
    use: [
      {
        loader: 'json-loader'
      }
    ]
  },
  {
    test: FONT_FILES,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name]-[sha1:hash:7].[ext]'
        }
      }
    ]
  },
  {
    test: BITMAP_IMAGES,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name]-[sha1:hash:7].[ext]'
        }
      }
    ]
  },
  {
    test: SVG_FILES,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name]-[sha1:hash:7].[ext]'
        }
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeTitle: true },
            { convertColors: { shorthex: false } },
            { convertPathData: false }
          ]
        }
      }
    ]
  },
  {
    test: SVG_COMPONENT_FILES,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: DIR_BABEL_CACHE_DIR
        }
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [ { removeTitle: true } ],
            floatPrecision: 2
          }
        }
      }
    ]
  }
].filter(Boolean);



config.plugins = [];


if (options.MINIFY) {
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

  config.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: __dirname
    }
  }));
} else {
  config.plugins.push(new webpack.NamedModulesPlugin());

  config.plugins.push(new webpack.LoaderOptionsPlugin({
    debug: true
  }));
}



const definitions = transform(options, (definition, optionValue, optionName) => { // definition.__SOME_VAR__ = JSON.stringify(options.__SOME_VAR__)
  if (/^__.+?__$/.test(optionName)) {
    definition[optionName] = JSON.stringify(optionValue);
  }
}, {});

definitions['process.env.NODE_ENV'] = JSON.stringify(options.NODE_ENV);

config.plugins.push(new webpack.DefinePlugin(definitions));



config.plugins.push(new CircularDependencyPlugin({
  exclude: /\/node_modules\//
}));



config.plugins.push(new ExtractTextPlugin({
  filename: '[name].css',
  disable: Boolean(options.ENV === environments.LOCAL),
  allChunks: true
}));



config.plugins.push(new webpack.ContextReplacementPlugin(/moment\/locale$/, /en-gb/));



config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'common',

  async: false,

  chunks: entries.map(({ name }) => name),
  // chunks: entries.map(({ name }) => options.ENV !== environments.LOCAL && name === sandboxEntry ? null : sandboxEntry).filter(Boolean),

  minChunks: (module) => ((/\/node_modules\//.test(module.resource) || /\/app\/vendor\//.test(module.resource)) && /\.(?:jsx?)(?:\?.*)?/.test(module.resource))
}));



if (options.MINIFY) {
  config.plugins.push(new UglifyJSPlugin());
}



if (options.DEV_PROGRESS) {
  config.plugins.push(webpackProgress());
}



if (options.COMPILE_STAT) {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'bundle-info.html'
  }));
}


config.resolve = {
  modules: [
    path.join(options.CWD, options.DIR_SRC),
    'node_modules'
  ],
  extensions: [ '.js' ],
  alias: {
    //'redux-form': path.join(options.CWD, 'node_modules/redux-form/dist/redux-form.js'),
    normalizr: path.join(options.CWD, 'node_modules/normalizr/dist/src/index.js') // fix if there is duplication of normalizr in node_modules
  }
};


config.resolveLoader = {
  alias: {
  }
};



config.bail = true;
config.stats = 'errors-only';

config.devtool = false;
config.cache = false;
config.watch = false;

config.context = __dirname;
config.node = {};
config.amd = false;

module.exports = config;
