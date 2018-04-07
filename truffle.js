// module.exports = {
//   networks: {
//     development: {
//       host: "localhost",
//       port: 8545,
//       network_id: "*" // Match any network id
//     }
//   }
// };
const HDWalletProvider = require('truffle-hdwallet-provider');

// read from mnemonic seed
const mnemonic = "put your mnemonic seed here if you want to deploy your own version";

module.exports = {
  networks: {
    live: {
      //network_id: 1 // Ethereum public network
      // optional config values
      // host - defaults to "localhost"
      // port - defaults to 8545
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
      provider: new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/'),
      network_id: '1',
      gas: 3000000,
      gasPrice: 3000000000
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io'),
      network_id: '3',
      gas: 3000000,
      gasPrice: 2000000000
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io'),
      network_id: '4',
      gas: 3000000,
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    }

  },
};

// module.exports = {
//   networks: {

//     live: {
//       //network_id: 1 // Ethereum public network
//       // optional config values
//       // host - defaults to "localhost"
//       // port - defaults to 8545
//       // gas
//       // gasPrice
//       // from - default address to use for any transaction Truffle makes during migrations
//       // ********* importanat  note 
//       // To ensure that only one network is ever connected at a time, modify the provider keys as follows:


//       provider: function () {
//         new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/')
//       },
//       network_id: '1',
//       gas: 3000000,
//       gasPrice: 3000000000
//     },
//     ropsten: {
//       provider: function () {
//         new HDWalletProvider(mnemonic, 'https://ropsten.infura.io')
//       },
//       network_id: '3',
//       gas: 3000000,
//       gasPrice: 2000000000
//     },
//     rinkeby: {
//       provider: function () {
//         new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io')
//       },
//       network_id: '4',
//       gas: 3000000,
//     },
//     development: {
//       host: 'localhost',
//       port: 8545,
//       network_id: '*' // Match any network id
//     }

//   },
// };
