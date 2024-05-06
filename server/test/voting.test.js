const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let votingInstance;

  beforeEach(async () => {
    votingInstance = await Voting.new(["Proposal1", "Proposal2", "Proposal3"]);
  });

  it("should initialize the chairperson correctly", async () => {
    const chairperson = await votingInstance.chairperson();
    assert.equal(chairperson, accounts[0], "Chairperson is not initialized correctly");
  });

  it("should initialize the proposals correctly", async () => {
    const proposalNames = await Promise.all(
      [...Array(3).keys()].map(async (i) => {
        const proposal = await votingInstance.proposals(i);
        return proposal.name;
      })
    );

    assert.deepEqual(proposalNames, ["Proposal1", "Proposal2", "Proposal3"], "Proposals are not initialized correctly");
  });

  it("should initialize the voters correctly", async () => {
    const chairperson = await votingInstance.chairperson();
    const chairpersonVoter = await votingInstance.voters(chairperson);
    assert.equal(chairpersonVoter.weight, 1, "Chairperson's weight is not initialized correctly");
  });
});
