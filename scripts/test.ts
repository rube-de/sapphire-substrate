import { ethers } from "hardhat";

async function main() {
  const substrateAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const signer = (await ethers.getSigners())[0];
  const contract = await ethers.getContractAt('Substrate', substrateAddr, signer);
  try {
    await contract.createSubstrate()
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
