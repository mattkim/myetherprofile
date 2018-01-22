module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    live: {
      network_id: 1,
      host: "127.0.0.1",
      port: 8546,   // Different than the default below
      from: "0xb07ba86d9f6eb62e1289a53e61f9c74dcd545b76", // default address to use for any transaction Truffle makes during migrations
    },
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
