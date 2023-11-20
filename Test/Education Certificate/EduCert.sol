// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EducationalCertificates {
    address public owner;

    struct Certificate {
        string institution;
        string degree;
        uint256 year;
    }

    mapping(address => Certificate) public certificates;

    event CertificateStored(
        address indexed student,
        string institution,
        string degree,
        uint256 year
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function storeCertificate(
        string memory institution,
        string memory degree,
        uint256 year
    ) public {
        require(bytes(institution).length > 0, "Institution is required");
        require(bytes(degree).length > 0, "Degree is required");
        require(year > 0, "Year must be greater than 0");

        certificates[msg.sender] = Certificate(institution, degree, year);
        emit CertificateStored(msg.sender, institution, degree, year);
    }
}
