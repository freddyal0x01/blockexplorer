import Head from 'next/head'
import { useState } from 'react';
import Header from "../components/header";
import { getEthAccountBalance } from '../utils/services';
import { formatEther } from '../utils/helper';


const Balance = () => {

    const [accountBalance, setAccountBalance] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("starting");

    const getBalance = async (event) => {

        try {
            event.preventDefault();
        
            setStatus("waiting");
    
            const funds = await getEthAccountBalance(inputValue);
            
            setAccountBalance(funds.toString());
            setStatus("done");
            setAddress(inputValue);
            setInputValue(""); 
        } catch (err) {
            setStatus("error");
        }
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }
    
    return (
        <>
            <Head>
                <title>Account Balance</title>
                <meta name="description" content="Account Balance for ETH Wallet Addresses" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="flex flex-col justify-center items-center text-center">

                <h1 className='text-3xl font-bold mt-12'>Ethereum Balance</h1>

                <form 
                    onSubmit={getBalance} 
                    className='grid sm:grid-cols-10 gap-4 mt-8 mb-16 w-4/5 shadow-2xl p-4 bg-white'
                >
                    <label 
                        className='sm:col-span-10 text-lg text-gray-900 font-semibold' 
                        htmlFor='address'
                    >
                        Search Wallet Address Balance
                    </label>
                    <input 
                        className='sm:col-span-8 bg-gray-200 p-2 rounded' 
                        type="text" 
                        id='address' 
                        onChange={handleInputChange}
                        placeholder="Wallet Address"
                        value={inputValue}
                    />
                    <button 
                        className='disabled:opacity-25 hover:bg-blue-800 sm:col-span-2 bg-blue-500 rounded p-2 text-white font-bold' 
                        type="submit"
                        disabled={
                            !inputValue
                        }
                    >
                        Search
                    </button>
                </form>
                
                {
                    status === "done" ? (
                        <article>
                            <section className='m-3'>
                                <p className='text-xl my-2 text-gray-900 font-semibold'>Ethereum Address</p>
                                <p className='text-sm sm:text-base my-2'>{address}</p>
                            </section>
                            <section className='m-3'>
                                <p className='text-xl my-2 text-gray-900 font-semibold'>Account Balance</p>
                                <p className='text-base my-2'><span className='font-semibold text-blue-600'>{formatEther(accountBalance)}</span> ETH</p>
                            </section>
                        </article>
                    ) : status === "waiting" ? (
                        <p className='flex'>
                            <span className='font-semibold text-xl self-center'>Loading...</span>
                        </p>
                    ) : status === "error" ? (
                        <p className='text-xl font-semibold text-red-600'>Incorrect Ethereum Address</p>
                    ) : (
                        <p></p>
                    )
                }

            </main>
            
        </>
    )
}

export default Balance;