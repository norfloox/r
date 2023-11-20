// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareApp {
    struct Patient {
        string name;
        uint age;
        string diagnosis;
        address doctor;
    }

    struct Doctor {
        string name;
    }

    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;

    event NewPatient(address indexed patientAddress, string name, uint age);
    event NewDoctor(address indexed doctorAddress, string name);
    event AssignedDoctor(address indexed patientAddress, address doctorAddress);
    event UpdatedDiagnosis(address indexed patientAddress, string diagnosis);

    modifier onlyDoctor() {
        require(
            bytes(doctors[msg.sender].name).length != 0,
            "Only registered doctors can perform this action"
        );
        _;
    }

    function registerDoctor(string memory _name) public {
        doctors[msg.sender] = Doctor(_name);
        emit NewDoctor(msg.sender, _name);
    }

    function addPatient(
        string memory _name,
        uint _age,
        string memory _diagnosis
    ) public {
        patients[msg.sender] = Patient(_name, _age, _diagnosis, address(0));
        emit NewPatient(msg.sender, _name, _age);
    }

    function assignDoctor(
        address _patientAddress,
        address _doctorAddress
    ) public onlyDoctor {
        require(
            patients[_patientAddress].doctor == address(0),
            "Patient already has a doctor"
        );
        patients[_patientAddress].doctor = _doctorAddress;
        emit AssignedDoctor(_patientAddress, _doctorAddress);
    }

    function updateDiagnosis(string memory _diagnosis) public onlyDoctor {
        patients[msg.sender].diagnosis = _diagnosis;
        emit UpdatedDiagnosis(msg.sender, _diagnosis);
    }
}
