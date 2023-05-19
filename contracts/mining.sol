//testing code
pragma solidity ^0.8.18;
// SPDX-License-Identifier: MIT


contract Mining {

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




