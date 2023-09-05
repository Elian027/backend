// jest.config.js
module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: [
      '/node_modules/'
    ],
    transform: {
      '^.+\\.js$': 'babel-jest', // Agregar soporte para Babel
    },
  };
  