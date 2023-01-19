import { useEffect, useState } from "react";
import { formatAddress } from "../utils/helper";
import { getLastTenBlocks } from "../utils/services";

const Blocks = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        (async() => {
            const _blocks = await getLastTenBlocks();
            setBlocks(_blocks);
        })();
    }, [blocks])

    return (
        <article className="self-center shadow-2xl p-4 my-2 sm:mx-2 w-4/5 bg-white">
            <h2 className="text-center text-2xl text-gray-900 font-semibold mb-2">Blocks</h2>
            {
                blocks.map(({miner, number, transactions}, index) => (
                    <section key={index} className="text-center grid grid-cols-3 p-2 bg-slate-50 border-slate-600 border-2 m-2">
                        <p>Block #: <span className="text-blue-600">{number}</span></p>
                        <p># of Txs: <span className="text-blue-600">{transactions.length}</span></p>
                        <p>Validator Address: <span className="text-blue-600 break-all">{formatAddress(miner)}</span></p>
                    </section>
                )) 
            } 
        </article>
    )
}

export default Blocks;