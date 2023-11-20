// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EducationDApp {
    struct Student {
        string name;
        uint256 age;
    }

    struct Course {
        string name;
        uint256 fee;
    }

    address public owner;
    mapping(address => Student) public students;
    Course[] public courses;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function addStudent(string memory name, uint256 age) public {
        students[msg.sender] = Student(name, age);
    }

    function addCourse(string memory name, uint256 fee) public onlyOwner {
        courses.push(Course(name, fee));
    }

    function enrollStudent(uint256 courseIndex) public {
        require(courseIndex < courses.length, "Invalid course index");
        Course storage course = courses[courseIndex];
        require(
            students[msg.sender].age >= 18,
            "Students must be at least 18 years old"
        );
        // Additional enrollment logic can be added here
    }
}
