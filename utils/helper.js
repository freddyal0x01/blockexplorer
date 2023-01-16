import { Utils } from 'alchemy-sdk';

// Formatted eth address for UI purposes
export const formatAddress = (address) => {
    return `${address.slice(0,5)}...${address.slice(-5)}`
}

// Convert Wei over to Eth
export const weiToEth = (wei) => {
    return Utils.formatEther(wei);
}
