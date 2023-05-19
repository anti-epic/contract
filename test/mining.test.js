const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider())
const {abi, evm} = require('../compile');



let accounts;
let mining;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    mining = await new web3.eth.Contract(abi)
        .deploy({data: '0x' + evm.bytecode.object, arguments: [accounts[0], accounts[1],accounts[2]] })
        .send({from: accounts[4], gas: '1000000'})
    });



describe('Mining', () => {
    it('deploys a contract', () => {
        console.log(mining)
        assert.ok(mining.options.address)
    });
    it('automaticly distributes rewards when they are send to the contract', async () => {
        const initialBalanceB = await web3.eth.getBalance(accounts[0]);
        const initialBalanceC = await web3.eth.getBalance(accounts[1]);
        const initialBalanceD = await web3.eth.getBalance(accounts[2]);


        const rewardAmount = web3.utils.toWei('0.02', 'ether');

        await mining.methods.addFunds().send({
            from: accounts[5],
            value: rewardAmount
        });

        const finalBalanceB = await web3.eth.getBalance(accounts[0]);
        const finalBalanceC = await web3.eth.getBalance(accounts[1]);
        const finalBalanceD = await web3.eth.getBalance(accounts[2]);
        assert(initialBalanceB < finalBalanceB);
        assert(initialBalanceC < finalBalanceC);
        assert(initialBalanceD < finalBalanceD);
    })


    it('sends the correct amount of rewards to each address', async () => {
        const rewardAmount = web3.utils.toWei('.02', 'ether');
        const initialBalanceB = await web3.eth.getBalance(accounts[0]);
        const initialBalanceC = await web3.eth.getBalance(accounts[1]);
        const initialBalanceD = await web3.eth.getBalance(accounts[2]);
        await mining.methods.addFunds().send({
            from: accounts[6],
            value: rewardAmount
        });
        const balanceB = await web3.eth.getBalance(accounts[0]);
        const balanceC = await web3.eth.getBalance(accounts[1]);
        const balanceD = await web3.eth.getBalance(accounts[2]);

        const expectedRewardB = Math.ceil((rewardAmount * 10) / 100);
        const expectedRewardC = Math.ceil((rewardAmount * 40) / 100);
        const expectedRewardD = Math.ceil((rewardAmount * 50) / 100);
        const tolerance = web3.utils.toWei('.001', 'ether'); // Define a tolerance range for gas costs

        assert.ok(
            balanceB - initialBalanceB >= expectedRewardB - tolerance &&
            balanceB - initialBalanceB <= expectedRewardB + tolerance,
            'Incorrect reward amount for account B'
        );
        assert.ok(
            balanceC - initialBalanceC >= expectedRewardC - tolerance &&
            balanceC - initialBalanceC <= expectedRewardC + tolerance,
            'Incorrect reward amount for account C'
        );
        assert.ok(
            balanceD - initialBalanceD >= expectedRewardD - tolerance &&
            balanceD - initialBalanceD <= expectedRewardD + tolerance,
            'Incorrect reward amount for account D'
        );
    });

});
