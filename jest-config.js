module.exports = {
  verbose: true,
  modulePaths: [
    '__stubs__',
  ],
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
    'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransformer.js',
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverageFrom: [
    '**/src/components/presentational/**.{js,jsx}',
    '**/src/**{plugins.config.js}',
    '!**/src/components/**{selectors.js}',
    // '!**/src/components/**{forms.config.js}',
    // '!**/src/components/**{forms.validation.js}',
    // '!**/src/components/**{table-columns.config.js}',
    // '!**/src/components/**{default-values.config.js}',
    // '!**/src/components/**{validation.js}',
    // '!**/src/components/**{values-names.config.js}',
    // '!**/src/components/**{options-for-select.config.js}',
    // '!**/src/components/**{theme-config.js}',
    // '!**/src/components/**{index.js}',
    // '!**/src/components/**{ducks/**}',
    // '!**/node_modules/**',
    // '!**/dist/**',
  ],
  collectCoverage: true,
}
