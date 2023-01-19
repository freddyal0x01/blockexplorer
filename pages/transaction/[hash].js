import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../components/header';


const Block = () => {
    const router = useRouter()
    const { number } = router.query
    console.log(router.query);
    console.log(number);

    return (
        <>
            <Head>
                <title>Block {}</title>
                <meta name="description" content={`Details about transaction `} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            
        </>
    )
}

export default Block;
