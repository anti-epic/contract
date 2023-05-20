const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, evm} = require('./compile');


const provider = new HDWalletProvider('perfect develop since despair window reason equip album parade human bless impose', 'https://sepolia.infura.io/v3/1ee09b6513844abaa9ebab59a90a62fb');

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attemping to deploy from account', accounts[0])
    const result = await new web3.eth.Contract(abi)
    .deploy({data: '0x' + evm.bytecode.object, arguments: [accounts[1],accounts[2],accounts[3]]})
    .send({gas: '1000000', from: accounts[0]});
    console.log(abi[0].inputs);
    console.log('Contract deployed to', result.options.address)
    provider.engine.stop()
};
deploy();
