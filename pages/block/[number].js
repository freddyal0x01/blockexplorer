import Head from 'next/head';
import Link from "next/link";
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { getIndividualBlock } from '../../utils/services';
import { formatEther } from '../../utils/helper';


const Block = ({ number }) => {

    const [blockData, setBlockData] = useState();

    useEffect(() => {
        (async () => {
            const block = await getIndividualBlock(+number);
            setBlockData(block);
        })()
    },[])

    console.log(blockData)

    return (
        <>
            <Head>
                <title>Block Details</title>
                {/* <meta name="description" content={`Details about transaction ${blockData.number}`} /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            {
                blockData === undefined ? (
                    <main className='flex flex-col justify-center items-center text-center'>
                        <article className='gap-4 my-8 w-4/5 shadow-2xl p-4 bg-white'>
                            <h1 className='text-3xl font-bold'>Block Details</h1>
                            <section className='flex flex-col mx-auto p-4 gap-8'>
                                <p><span className='font-medium text-2xl self-center'>Loading...</span></p>
                            </section>
                        </article>
                    </main>
                ) : (
                    <main className='flex flex-col items-center'>
                        <article className='gap-4 my-8 w-4/5 xl:w-3/5 shadow-2xl p-4 bg-white'>
                            <h1 className='text-3xl my-5 font-bold text-center'>Block Details</h1>
                            <section className='flex flex-col mx-auto p-4 gap-8'>
                                <div className='flex justify-between border-b border-slate-400'>
                                    <span>Block Number:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{blockData.number}</span>
                                </div>
                                <div className='flex justify-between border-b border-slate-400'>
                                    <span>Gas Limit:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{formatEther(blockData.gasLimit.toString())} ETH</span>
                                </div>
                                <div className='flex justify-between border-b border-slate-400'>
                                    <span>Gas Used:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{formatEther(blockData.gasUsed.toString())} ETH</span>
                                </div>
                                <div className='flex justify-between border-b border-slate-400'>
                                    <span>Block Hash:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{blockData.hash}</span>
                                </div>
                                <div className='flex justify-between border-b border-slate-400'>
                                    <span>Validator:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{blockData.miner}</span>
                                </div>
                                <div className='flex justify-between border-b border-slate-400'>
                                    <span>Parent Hash:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{blockData.parentHash}</span>
                                </div>
                                <div className='flex justify-between border-b border-slate-400'>
                                    <span>Timestamp:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{blockData.timestamp} ETH</span>
                                </div>
                                <div className='flex justify-between border-b border-slate-400'>
                                    <span>Number of Transactions:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{blockData.transactions.length}</span>
                                </div>
                                <div className='w-full h-32 flex justify-between overflow-y-scroll border-b border-slate-400'>
                                    <span>Transactions:</span>&nbsp;
                                    <ul>
                                    {
                                        blockData.transactions.map((tx) => (
                                            <li>
                                                <Link 
                                                    className='text-blue-600 hover:underline hover:text-blue-800 visited:text-purple-600'
                                                    href={
                                                        {
                                                            pathname: `/transaction/[hash]`,
                                                            query: { hash: tx }
                                                        }
                                                    }
                                               >
                                                    <span className='break-all text-blue-600'>{tx}</span>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                    </ul>
                                </div>
                            </section>
                        </article>
                    </main>
                )
            }

            
        </>
    )
}
     
export async function getServerSideProps({params}) {
    const number = params.number

    return { props: { number } }
}

export default Block;
