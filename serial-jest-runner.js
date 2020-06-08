// https://github.com/facebook/jest/issues/3215#issuecomment-595223217
const DefaultJestRunner = require('jest-runner');

class SerialJestRunner extends DefaultJestRunner {
    constructor(...args) {
        super(...args);
        this.isSerial = true;
    }
}

module.exports = SerialJestRunner;