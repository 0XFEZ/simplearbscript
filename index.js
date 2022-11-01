const { ethers } = require("ethers");
const abi = require("./arb.json");
const address = "0xc33DCc56D446FFac1c16d10c7cebD874ab053E59";
const RPC = "https://rpc.ankr.com/bsc";
const provider = new ethers.providers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(
  "", // Put your private keys in here
  provider
);
const arbContract = new ethers.Contract(address, abi, wallet);

const main = async () => {
  const array1 = [
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // Starting Token a
    "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", // Token to buy b
  ];
  const amount = ethers.utils.parseEther("100");

  const getAmount1 = await arbContract.getPancakeAmountsOut(amount, array1);

  const formattedValue1 = ethers.utils.formatEther(getAmount1[0]);
  const formattedValue2 = ethers.utils.formatEther(getAmount1[1]);
  console.log(
    "Buying ",
    Number(formattedValue1).toFixed(3),
    " worth of token A"
  );
  console.log("Get back ", Number(formattedValue2).toFixed(3), " Of token B");

  const array2 = [
    "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", // Selling token b
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // Buying back token a
  ];
  const amount2 = ethers.utils.parseEther(formattedValue2);

  const getAmount2 = await arbContract.getPancakeAmountsOut(amount2, array2);

  const formattedValue3 = ethers.utils.formatEther(getAmount2[0]);
  const formattedValue4 = ethers.utils.formatEther(getAmount2[1]);
  console.log("Selling ", Number(formattedValue3).toFixed(3), " of token B");
  console.log(
    "Getting back ",
    Number(formattedValue4).toFixed(3),
    " of token A"
  );
};

main();
