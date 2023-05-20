import web3 from './web3';
const address = "0x3C5d008b8A054Ea6669DD50b8cFDbF885F752daf"
const abi = [
    {
        inputs: [
            [Object], [Object], [Object]
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
        constant: undefined,
        payable: undefined,
        signature: 'constructor'
    },
    {
        inputs: [],
        name: 'addFunds',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
        constant: undefined,
        payable: true,
        signature: '0xa26759cb'
    },
    {
        inputs: [],
        name: 'addressB',
        outputs: [
            [Object]
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0x4526196e'
    },
    {
        inputs: [],
        name: 'addressC',
        outputs: [
            [Object]
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0xc79fc609'
    }, {
        inputs: [],
        name: 'addressD',
        outputs: [
            [Object]
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0xd8574e16'
    }
]


export default new web3.eth.Contract(abi, address)
