const Voting = artifacts.require("Voting");


module.exports = async function(deployer) {

  // Deploy the Voting contract with constructor arguments
  await deployer.deploy(Voting, ["Uma Devi","Dinanath Singh Chauhan","Shivraj Rathore"], 90000);

  // Retrieve the deployed contract instance
  const votingInstance = await Voting.deployed();

  // Log the address of the deployed contract
  console.log("Contract address:", votingInstance.address);
};
