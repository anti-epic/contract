pragma solidity ^0.8.18;
// SPDX-License-Identifier: MIT
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract Mining is ReentrancyGuard {

    address public addressB;
    address public addressC;
    address public addressD;

    constructor(address _addressB, address _addressC, address _addressD) {
        addressB = _addressB;
        addressC = _addressC;
        addressD = _addressD;
    }

    function distributeMiningRewards() internal {
        uint256 balance = address(this).balance;
        uint256 amountB = (balance * 10) / 100;
        uint256 amountC = (balance * 40) / 100;

        (bool successB, ) = addressB.call{value: amountB}("");
        require(successB, "Transfer to addressB failed");

        (bool successC, ) = addressC.call{value: amountC}("");
        require(successC, "Transfer to addressC failed");

        (bool successD, ) = addressD.call{value: address(this).balance}("");
        require(successD, "Transfer to addressD failed");
    }

    function addFunds() external payable restricted {
        distributeMiningRewards();
    }

   modifier restricted() {
        require(msg.value > 0.01 ether, "Minimum value not met");
        _;
    }
}



//https://pegasus.compverse.io/address/0x93AB88b5e420c3A81F7FAdaA7AC706080127E028
