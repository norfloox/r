// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EVoting {
    address public electionAuthority;
    bool public votingOpen;

    struct Voter {
        bool voted;
        uint8 candidateChoice;
    }

    mapping(address => Voter) public voters;
    address[] public candidateList;

    event Voted(address voter, uint8 candidateChoice);
    event VotingClosed();

    modifier onlyElectionAuthority() {
        require(
            msg.sender == electionAuthority,
            "Only the election authority can perform this action"
        );
        _;
    }

    constructor() {
        electionAuthority = msg.sender;
        votingOpen = true;
    }

    function addCandidate() public onlyElectionAuthority {
        require(votingOpen, "Voting is closed");
        candidateList.push(msg.sender);
    }

    function vote(uint8 candidateChoice) public {
        require(votingOpen, "Voting is closed");
        require(
            candidateChoice < candidateList.length,
            "Invalid candidate choice"
        );
        require(!voters[msg.sender].voted, "You have already voted");

        voters[msg.sender].voted = true;
        voters[msg.sender].candidateChoice = candidateChoice;
        emit Voted(msg.sender, candidateChoice);
    }

    function closeVoting() public onlyElectionAuthority {
        require(votingOpen, "Voting is already closed");
        emit VotingClosed();
        votingOpen = false;
    }
}
