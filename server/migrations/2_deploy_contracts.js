const Voting = artifacts.require("Voting");

// Function to convert string to bytes32
function stringToBytes32(str) {
  let bytes32 = web3.utils.asciiToHex(str);
  bytes32 = bytes32.padEnd(66, '0'); // Ensure bytes32 length is 66 (2 characters per byte)
  return bytes32;
}

module.exports = async function(deployer) {
  // Proposal names
  const proposalNames = ["Proposal1", "Proposal2", "Proposal3"];

  // Convert proposal names to bytes32
  const proposalBytes32 = proposalNames.map(name => stringToBytes32(name));

  // Deploy the Voting contract with the converted proposal names
  await deployer.deploy(Voting, proposalBytes32);
};
