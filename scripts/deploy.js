const hre = require("hardhat");

async function main() {
  const Storage = await hre.ethers.getContractFactory("SimpleStorage");
  const storage = await Storage.deploy();
  await storage.deployed();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
