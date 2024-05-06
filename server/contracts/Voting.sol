// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract Voting {

    struct Voter {
        bool voted;
        uint weight;
        uint vote;
    }
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    Proposal[] public proposals;
    mapping(address => Voter) public voters;
    address public chairperson;

    constructor(bytes32[] memory proposalNames) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        for(uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    // Function for voters to cast their votes
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You have already voted.");
        sender.voted = true;
        sender.vote = proposal;
        proposals[proposal].voteCount += sender.weight;
    }

    // Function to get the total number of candidates
    function getCandidateCount() public view returns (uint) {
        return proposals.length;
    }

    // Function to get the total number of votes for a candidate
    function getTotalVotesForCandidate(uint candidateIndex) public view returns (uint) {
        require(candidateIndex < proposals.length, "Invalid candidate index.");
        return proposals[candidateIndex].voteCount;
    }
}
