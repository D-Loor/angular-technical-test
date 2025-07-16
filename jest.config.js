const { createCjsPreset } = require('jest-preset-angular/presets');

module.exports = {
  ...createCjsPreset({ tsconfig: '<rootDir>/tsconfig.spec.json' }),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!@angular|rxjs|tslib|jest-preset-angular)/',
  ],
  moduleFileExtensions: ['ts', 'js', 'html', 'json', 'mjs'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  verbose: true,
};
