import { Network, Alchemy } from 'alchemy-sdk';

import { config } from 'dotenv';
config()

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Obtain all of the txs from an ETH address
export const getAccountTxs = async (address) => {
  txHistory = {
    fromBlock: "0x0",
    fromAddress: address,
    excludeZeroValue: true,
    category: ["external", "internal", "erc20", "erc721", "erc1155"],
  }
  const txs = await alchemy.core.getAssetTransfers(txHistory);
  return txs;
}

// Get the balance in wei from an eth address
export const getAccountEthBalance = async (address) => {
  const balance = await alchemy.core.getBalance(address, "latest");
  return balance;
}

// Get the NFT metadata based off the contract address and token ID
export const getNftMetadata = async(contractAddress, tokenId) => {
  const nftMetadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
  return nftMetadata;
}