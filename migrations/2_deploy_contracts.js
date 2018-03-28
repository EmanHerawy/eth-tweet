 var TweetAccount = artifacts.require("./TweetAccount.sol");
 var TweetRegistry = artifacts.require("./TweetRegistry.sol");

 module.exports = function (deployer) {
   //deployer.deploy(TweetAccount, "0xed2a75299ef373027f7999049d849321efc3abb3");
   deployer.deploy(TweetRegistry, "Eman EL Herawy ");
 };
