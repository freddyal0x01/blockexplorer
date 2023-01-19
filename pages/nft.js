import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from "../components/header";
import { getNftMetadata } from '../utils/services';


const NFT = () => {

    const [nftMetadata, setNftMetaData] = useState({});
    const [nftAddressInputValue, setNftAddressInputValue] = useState("");
    const [tokenIDInputValue, setTokenIDInputValue] = useState("");
    const [status, setStatus] = useState("starting");

    const getNftData = async (event) => {
        try {
            event.preventDefault();
        
            setStatus("waiting");
        
            const nftDetails = await getNftMetadata(nftAddressInputValue, tokenIDInputValue);
            
            console.log(nftDetails);

            setNftMetaData(nftDetails)

            setStatus("done");
        } catch (err) {
            setStatus("error");
        }
    }

    return (
        <>
            <Head>
                <title>NFT Deets</title>
                <meta name="description" content="Get the deets on ETH NFTs vis OpenSea" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="flex flex-col justify-center items-center text-center">

                <h1 className='text-3xl font-bold mt-12'>NFT Details</h1>

                <form 
                    onSubmit={getNftData}
                    className='grid sm:grid-cols-10 gap-4 my-8 w-4/5 shadow-2xl p-4 bg-white'
                >
                    <p className='sm:col-span-10 m-2'>Note: This will only work for the OpenSea Marketplace</p>
                    <label 
                        className='sm:col-span-10 text-lg text-gray-900 font-bold mt-1' 
                        htmlFor='address'
                    >
                        NFT Contract Address
                    </label>
                    <input 
                        className='sm:col-span-10 bg-gray-200 p-2 rounded ' 
                        type="text" 
                        id='address' 
                        onChange={(e) => setNftAddressInputValue(e.target.value)}
                        placeholder="NFT Contract Address"
                        value={nftAddressInputValue}
                    />
                    <label 
                        className='sm:col-span-10 text-lg text-gray-900 font-bold mt-1' 
                        htmlFor='address'
                    >
                        NFT Token ID
                    </label>
                    <input 
                        className='sm:col-span-10 bg-gray-200 p-2 rounded ' 
                        type="text" 
                        id='address' 
                        onChange={(e) => setTokenIDInputValue(e.target.value)}
                        placeholder="NFT Token ID"
                        value={tokenIDInputValue}
                    />
                    <button 
                        className='justify-self-center sm:w-1/5 disabled:opacity-25 hover:bg-blue-800 sm:col-span-10 bg-blue-500 rounded p-2 text-white font-bold my-1' 
                        type="submit"
                        disabled={
                            !nftAddressInputValue && !tokenIDInputValue 
                        }
                    >
                        Search
                    </button>
                </form>
                
                {
                    
                    status === "done" ? (
                        
                        <article className='grid grid-cols-1 sm:grid-cols-10 gap-4 my-8 w-4/5 shadow-2xl p-4 bg-white'>
                            <h2 className='sm:col-span-10 text-2xl mt-4 text-gray-900 font-semibold'>NFT Metadata</h2>
                            <Image 
                                src={nftMetadata.contract.openSea.imageUrl}
                                alt={`${nftMetadata.contract.openSea.imageUrl} Logo`}
                                className="justify-self-center sm:col-span-4 my-4 w-auto h-auto"
                                width={300}
                                height={300}
                            />
                            <section className="col-span-1 text-left sm:col-span-6 mt-4 p-2">
                                <p className='mb-2'>
                                    <span className='font-semibold text-gray-900'>NFT Address:</span>&nbsp;
                                    <Link 
                                        className='text-blue-600 break-words hover:underline hover:text-blue-800 visited:text-purple-600' 
                                        href={`https://etherscan.io/address/${nftMetadata.contract.address}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                            {nftMetadata.contract.address}
                                    </Link> 
                                </p>
                                <p className='mb-2'>
                                    <span className='font-semibold text-gray-900'>Collection Name:</span>&nbsp;
                                    <span className='font-medium text-slate-800'>{nftMetadata.contract.name}</span>
                                </p>
                                <p className='mb-2'>
                                    <span className='font-semibold text-gray-900'>Collection Symbol:</span>&nbsp;
                                    <span className='font-medium text-slate-800'>{nftMetadata.contract.symbol}</span>
                                </p>
                                <p className='mb-2'>
                                    <span className='font-semibold text-gray-900'>Collection Website:</span>&nbsp;
                                    <Link 
                                        className='text-blue-600 hover:underline hover:text-blue-800 visited:text-purple-600' 
                                        href={nftMetadata.contract.openSea.externalUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                            {nftMetadata.contract.openSea.externalUrl}
                                    </Link>
                                </p>
                                {nftMetadata.title ? (
                                    <p className='mb-2'>
                                        <span className='font-semibold text-gray-900'>NFT Title:</span>&nbsp;
                                        <span className='font-medium text-slate-800'>{nftMetadata.title}</span>
                                    </p>
                                ) : (
                                    null
                                )}
                                <p className='mb-2'>
                                    <span className='font-semibold text-gray-900'>Floor Price:</span>&nbsp;
                                    <span className='font-bold text-blue-700'>{nftMetadata.contract.openSea.floorPrice}</span> ETH
                                </p>
                                <p className='mb-2'>
                                    <span className='font-semibold text-gray-900'>NFT Description:</span>&nbsp;
                                    <span className='font-medium text-slate-800'>{nftMetadata.contract.openSea.description}</span>
                                </p>
                            </section>
                        </article>

                    ) : status === "waiting" ? (
                        <p className='flex'>
                            <span className='font-bold text-xl self-center'>Loading...</span>
                        </p>
                    ) : status === "error" ? (
                        <p className='text-xl font-semibold text-red-600'>Incorrect NFT Contract Address or Token ID</p>
                    ) : (
                        <p></p>
                    )
                }

            </main>
        </>
    )
}

export default NFT;


