const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("SimpleStorage", () => {
  let Storage, storage;

  //what to do before ech test
  //deploy contract first
  beforeEach(async () => {
    Storage = await ethers.getContractFactory("SimpleStorage");
    storage = await Storage.deploy();
    await storage.deployed();
  });
  it("should start with a favourite number of zero", async () => {
    const currValeu = await storage.retrieve();
    const expectedValue = "0";
    //compare values
    assert.equal(currValeu.toString(), expectedValue);
  });
});
