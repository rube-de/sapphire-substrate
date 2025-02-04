import { ethers } from "hardhat";

import { randomBytes } from 'crypto';

async function main() {
  const substrateAddr = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

  const signer = (await ethers.getSigners())[0];
  const contract = await ethers.getContractAt('Substrate', substrateAddr, signer);
  const tx = await contract.createSubstrate();
  await tx.wait();

  try {
  } catch (error) {
    console.log(error);
  }
  console.log(`Sign successful`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
