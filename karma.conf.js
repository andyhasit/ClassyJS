// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'source.js',
      'tests.js'
    ],
    exclude: [],
    reporters: ['progress'],
    proxies : {},
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],//'Chrome' PhantomJS
    singleRun: true,
    concurrency: Infinity
  });
};
