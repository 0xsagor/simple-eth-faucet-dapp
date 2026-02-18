// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Faucet {

    address public owner;
    uint256 public payoutAmount = 0.01 ether;
    uint256 public cooldown = 1 minutes;

    mapping(address => uint256) public lastRequest;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function requestFunds() external {
        require(address(this).balance >= payoutAmount, "Empty faucet");
        require(
            block.timestamp - lastRequest[msg.sender] >= cooldown,
            "Wait before requesting again"
        );

        lastRequest[msg.sender] = block.timestamp;
        payable(msg.sender).transfer(payoutAmount);
    }

    function deposit() external payable {}

    function withdrawAll() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
