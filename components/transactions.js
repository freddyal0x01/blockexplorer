import Link from "next/link";
import { useEffect, useState } from "react";
import { formatAddress, formatEther } from "../utils/helper";
import { getLastTenTxs } from "../utils/services";

const Transactions = () => {

    const [txs, setTxs] = useState([]);

    useEffect(() => {
        (async() => {
            const _txs = await getLastTenTxs();
            setTxs(_txs);
        })();
    }, [])

    return (
        <article className="self-center shadow-2xl p-4 my-2 sm:mx-2 w-4/5 bg-white">
            <h2 className="text-center text-2xl text-gray-900 font-semibold mb-2">Transactions</h2>
            {
                txs.map(({hash, from, to, value}, index) => (
                    <section key={index} className="text-center grid grid-cols-4 p-2 bg-slate-50 border-slate-600 border-2 m-2">
                        <p>
                            Tx Hash:&nbsp;
                            <Link 
                                className='text-blue-600 hover:underline hover:text-blue-800 visited:text-purple-600'
                                href={
                                    {
                                        pathname: `/transaction/[hash]`,
                                        query: { hash }
                                    }
                                }
                            >
                                {<span className="text-blue-600 break-all">{formatAddress(hash)}</span>}
                            </Link>
                        </p>
                        <p>From: <span className="text-blue-600 break-all">{formatAddress(from)}</span></p>
                        <p>To: <span className="text-blue-600 break-all">{formatAddress(to)}</span></p>
                        <p>Amount: <span className="text-blue-600 break-all">{formatEther(value)} ETH</span></p>
                    </section>
                )) 
            }
        </article>
    )
}

export default Transactions;