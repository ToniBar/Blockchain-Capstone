// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var ERC721MintableVerifier = artifacts.require("RealEstateToken");

module.exports = function(deployer) {
  //deployer.deploy(SquareVerifier);
  //deployer.deploy(SolnSquareVerifier);
  deployer.deploy(ERC721MintableVerifier);
};
