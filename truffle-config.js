// require("babel-register");
// require("babel-polyfill");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: "7545",
      network_id: "*",
    },
  },
  contracts_directory: "./contracts/",
  contracts_build_directory: "./truffle_abis",
  compilers: {
    solc: {
      version: "^0.4.22",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
