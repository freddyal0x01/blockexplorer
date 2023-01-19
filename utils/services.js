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
export const getNftMetadata = async (contractAddress, tokenId) => {
  const nftMetadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
  return nftMetadata;
}

// Get 10 of the latest blocks from the blockchain
export const getLastTenBlocks = async () => {
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
export const getIndividualBlock = async (block) => {
  const _block = await alchemy.core.getBlock(block);
  return _block;
}

// Get 10 of the latest txs from the latest block
export const getLastTenTxs = async () => {
  const lastTenTxs = [];
  const lastBlock = await alchemy.core.getBlockNumber();
  // for (let i = 0; i < lastBlock)
  const block = await alchemy.core.getBlock(lastBlock);
  const txs = block.transactions;

  for (let tx of txs.slice(0,10)) {
    const tx_data = await alchemy.transact.getTransaction(tx)
    lastTenTxs.push(tx_data);
  }

  return lastTenTxs;
}

// Get the details of an indivitual tx
export const getIndividualTx = async (tx) => {
  const _tx = await alchemy.transact.getTransaction(tx);
  return _tx;
}
