import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../components/header';
import { getIndividualTx } from '../../utils/services';


const Block = () => {
    const router = useRouter();
    
    const { hash } = router.query;

    // console.log(hash);

    async function getInfo() {
        const tx = await getIndividualTx(hash);
        console.log(tx);
        return tx;
    }

    getInfo()

    return (
        <>
            <Head>
                <title>Transaction {hash}</title>
                <meta name="description" content={`Details about transaction ${hash}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className='flex flex-col justify-center items-center text-center'>
                <article className='gap-4 my-8 w-4/5 shadow-2xl p-4 bg-white'>
                    <h1 className='text-3xl font-bold'>Transaction Details</h1>
                </article>
            </main>
        </>
    )
}

export default Block;
