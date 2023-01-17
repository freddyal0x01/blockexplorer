import { alchemy } from "../utils/services";

const Blocks = () => {

    const getBlock = async () => {
        const blockNumber = await alchemy.core.getBlockNumber();
        console.log(blockNumber)

        const txs = await alchemy.core.getBlockWithTransactions(blockNumber);
        console.log(txs)
    }

    return (
        <section className="self-center shadow-2xl my-2 sm:mx-2 w-4/5 bg-white">
            <h2 className="text-center text-2xl text-gray-900 font-semibold">Blocks</h2>
            {getBlock()}
        </section>
    )
}

export default Blocks;