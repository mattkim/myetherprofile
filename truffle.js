module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0xdca47816860df5a1e5bbee4fca8c47b593417753", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id,
      gas: 5000000
    }
  }
};
