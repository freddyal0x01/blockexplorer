import Image from "next/image";
import Link from 'next/link';

const Header = () => {

    return (
        <header className="flex items-center justify-around p-5 bg-white">
            <Link href="/">
                <Image 
                    src="/web-link.svg"
                    alt="Block Explorer Logo"
                    className="cursor-pointer"
                    height={60}
                    width={60}
                />
            </Link>
            <nav>                
                <ul className="flex list-none gap-5">
                    <Link href="/"><li className="font-medium text-lg cursor-pointer hover:underline">Home</li></Link>
                    <Link href="/balance"><li className="font-medium text-lg cursor-pointer hover:underline">Balance</li></Link>
                    <Link href="/nft"><li className="font-medium text-lg cursor-pointer hover:underline">NFT</li></Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header;