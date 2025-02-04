import { ethers } from "hardhat";

async function main() {
    const signtestFactory = await ethers.getContractFactory("SigningTests");
    const signtest = await signtestFactory.deploy();
    await signtest.waitForDeployment();
    console.log(`Deployed SigningTests test to: ${signtest.target}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
