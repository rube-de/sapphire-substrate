import '@oasisprotocol/sapphire-hardhat';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const TEST_HDWALLET = {
	mnemonic: "test test test test test test test test test test test junk",
	path: "m/44'/60'/0'/0",
	initialIndex: 0,
	count: 20,
	passphrase: "",
};
const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : TEST_HDWALLET;


const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    'sapphire-localnet': {
      url: 'http://127.0.0.1:8545',
      chainId: 0x5afd, // 23293
      accounts,
		},
  }
};

export default config;
