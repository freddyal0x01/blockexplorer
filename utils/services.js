import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
export const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

export const alchemy = new Alchemy(settings);

// Get the balance in wei from an eth address
export const getEthAccountBalance = async (address) => {
  const balance = await alchemy.core.getBalance(address, "latest");
  return balance;
}

// Get the NFT metadata based off the contract address and token ID
export const getNftMetadata = async(contractAddress, tokenId) => {
  const nftMetadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
  return nftMetadata;
}

// Get 10 of the latest blocks from the blockchain
export const getLastTenBlocks = async() => {
  const lastTenBlocks = [];
  const latestBlock = await alchemy.core.getBlockNumber();
  let block = latestBlock;
  while (block > latestBlock - 10) {
    const _block = await alchemy.core.getBlock(block);
    lastTenBlocks.push(_block);
    block--;
  }
  return lastTenBlocks;
}

// Get the details of an individual block
export const getIndividualBlock = async(block) => {
  const blockNumber = await alchemy.core.getBlock(block);
  return blockNumber;
}

// Get 10 of the latest txs from the latest block
export const getLastTenTxs = async() => {
  const lastTenTxs = [];
  const lastBlock = await alchemy.core.getBlockNumber();
  
}

// Get the details of an indivitual tx
export const getIndividualTx = () => {

}

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