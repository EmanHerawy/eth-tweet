 var TweetAccount = artifacts.require("./TweetAccount.sol");
 var TweetRegistry = artifacts.require("./TweetRegistry.sol");

 module.exports = function (deployer) {
   // deployer.deploy(TweetAccount);
   deployer.deploy(TweetRegistry, "Eman");
 };
