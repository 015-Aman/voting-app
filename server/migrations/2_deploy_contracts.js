const Voting = artifacts.require("Voting");


module.exports = async function(deployer) {

  // Deploy the Voting contract with constructor arguments
  await deployer.deploy(Voting, ["Sudhanshu Sharma","Akhilesh Prasad","Lalita Devi","Sunita Sharma"], 90);

  // Retrieve the deployed contract instance
  const votingInstance = await Voting.deployed();

  // Log the address of the deployed contract
  console.log("Contract address:", votingInstance.address);
};
