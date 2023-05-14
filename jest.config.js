module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.css$': 'jest-css-modules-transform',
    },
};