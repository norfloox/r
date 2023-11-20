// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecords {
    address public owner;

    enum Role {
        Patient,
        Physician,
        LabTechnician
    }

    struct Record {
        string data;
        address owner;
        mapping(Role => bool) access;
    }

    mapping(address => Record) public healthRecords;

    event RecordCreated(address indexed owner, string data);
    event RecordAccessGranted(address indexed owner, Role role);
    event RecordAccessRevoked(address indexed owner, Role role);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createRecord(string memory data) public {
        healthRecords[msg.sender].data = data;
        healthRecords[msg.sender].owner = msg.sender;
        emit RecordCreated(msg.sender, data);
    }

    function grantAccess(Role role, address recipient) public {
        require(
            msg.sender == recipient || msg.sender == owner,
            "Access can only be managed by the owner or the recipient"
        );
        healthRecords[msg.sender].access[role] = true;
        emit RecordAccessGranted(msg.sender, role);
    }

    function revokeAccess(Role role, address recipient) public {
        require(
            msg.sender == recipient || msg.sender == owner,
            "Access can only be managed by the owner or the recipient"
        );
        healthRecords[msg.sender].access[role] = false;
        emit RecordAccessRevoked(msg.sender, role);
    }

    function getRecord() public view returns (string memory) {
        require(
            msg.sender == healthRecords[msg.sender].owner ||
                healthRecords[msg.sender].access[Role.Patient] ||
                healthRecords[msg.sender].access[Role.Physician] ||
                healthRecords[msg.sender].access[Role.LabTechnician],
            "Access denied"
        );
        return healthRecords[msg.sender].data;
    }
}
