import Head from 'next/head'
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { getIndividualTx } from '../../utils/services';
import { formatEther } from '../../utils/helper';


const Transaction = ({ hash }) => {

    const [txData, setTxData] = useState({});  

    useEffect(() => {
        (async () => {
            const tx = await getIndividualTx(hash);
            setTxData(tx)
        })()
    },[])

    return (
        <>
            <Head>
                <title>Transaction Details</title>
                <meta name="description" content={`Details about transaction ${txData.hash}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            {
                txData.value === undefined ? (
                    <main className='flex flex-col justify-center items-center text-center'>
                        <article className='gap-4 my-8 w-4/5 shadow-2xl p-4 bg-white'>
                            <h1 className='text-3xl font-bold'>Transaction Details</h1>
                            <section className='flex flex-col mx-auto p-4 gap-8'>
                                <p><span className='font-medium text-2xl self-center'>Loading...</span></p>
                            </section>
                        </article>
                    </main>
                ) : (
                    <main className='flex flex-col items-center'>
                        <article className='gap-4 my-8 w-4/5 xl:w-3/5 shadow-2xl p-4 bg-white'>
                            <h1 className='text-3xl my-5 font-bold text-center'>Transaction Details</h1>
                            <section className='flex flex-col mx-auto p-4 gap-8'>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>Block Hash:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{txData.blockHash}</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>Block Number:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{txData.blockNumber}</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>Nonce:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{txData.nonce}</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>From:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{txData.from}</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>To:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{txData.to}</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>Value:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{formatEther(txData.value.toString())} ETH</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>Gas Price:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{formatEther(txData.gasPrice.toString())} ETH</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>Gas Limit:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{formatEther(txData.gasLimit.toString())} ETH</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>v:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{txData.v}</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>r:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{txData.r}</span>
                                </p>
                                <p className='flex justify-between border-b border-slate-400'>
                                    <span>s:</span>&nbsp;
                                    <span className='break-all text-blue-600'>{txData.s}</span>
                                </p>
                            </section>
                        </article>
                    </main>
                )
            }

            
        </>
    )
}
     
export async function getServerSideProps({params}) {
    const hash = params.hash

    return { props: { hash } }
}

export default Transaction;