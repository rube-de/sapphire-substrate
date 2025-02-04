import { ethers } from "hardhat";

async function main() {
    const substrateFactory = await ethers.getContractFactory("Substrate");
    const substrate = await substrateFactory.deploy();
    await substrate.waitForDeployment();
    console.log(`Deployed Substrate test to: ${substrate.target}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
