const hre = require("hardhat");

async function main() {
  console.log(`Deploying Contract`);
  const Storage = await hre.ethers.getContractFactory("SimpleStorage");
  const storage = await Storage.deploy();
  await storage.deployed();
  console.log(`Deployed Contract to ${storage.address}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
