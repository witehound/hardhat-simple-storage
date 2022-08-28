const hre = require("hardhat");

//deploy fuunction
async function main() {
  console.log(`Deploying Contract`);
  const Storage = await hre.ethers.getContractFactory("SimpleStorage");
  const storage = await Storage.deploy();
  await storage.deployed();
  console.log(`Deployed Contract to ${storage.address}`);

  if (hre.network.config.chainId != 31337 && process.env.ETHER_KEYS) {
    await storage.deployTransaction.wait(6);
    await verify();
  }

  //Contract interaction
  const currValue = await storage.retrieve();
  console.log(`Currennt Value is : ${currValue}`);

  //Uupdate the cuurrent value
  const transactionRes = await storage.store(7);
  await transactionRes.wait(1);
  const updatedValue = await storage.retrieve();
  console.log(`Currennt Value is : ${updatedValue}`);
}

//verify deployed contract
const verify = async (contractAdd, args) => {
  console.log("verifying contract .....");
  try {
    await hre.run("verify:verify", {
      address: contractAdd,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
