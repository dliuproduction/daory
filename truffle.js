var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "wire equip prefer emerge timber place canvas stairs improve barrel pass door";

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/c2bf84051af743f58d4ba584e7922cd7")
      },
      network_id: "4", // Rinkeby ID 4
     }
  }
};
