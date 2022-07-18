// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract demo {
    uint256 number;

    function setNumber(uint256 num) public {
        number = num;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
