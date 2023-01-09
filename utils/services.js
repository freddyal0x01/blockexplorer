import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "lGcVaxhcnSrKzVIv5t1ZlQRxPiTwK4bk", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

// console.log(process.env.ALCHEMY_API_KEY)
// console.log(settings)

const alchemy = new Alchemy(settings);




// Get the balance in wei from an eth address. 
export const getAccountEthBalance = async (address) => {
  const balance = await alchemy.core.getBalance(address, "latest");
  return balance;
}


