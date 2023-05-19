const path = require('path');
const fs = require('fs');
const solc = require('solc');


const miningPath = path.resolve(__dirname, 'contracts', 'mining.sol')
const source = fs.readFileSync(miningPath, 'utf8');


var input = {
    language: 'Solidity',
    sources: {
        'mining.sol': {
            content: source
        }

    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};
const compiledData = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = compiledData.contracts['mining.sol'].Mining
