import react from "react";
import Image from "next/image";
import Link from 'next/link';

const Header = () => {

    return (
        <header className="flex items-center justify-around p-5">
            <Link href="/">
                <Image 
                    src="/web-link.svg"
                    alt="Block Explorer Logo"
                    className="cursor-pointer"
                    height={75}
                    width={75}
                />
            </Link>
            <nav>                
                <ul className="flex list-none gap-5">
                    <Link href="/"><li className="text-lg cursor-pointer">Home</li></Link>
                    <Link href="/balance"><li className="text-lg cursor-pointer">Balance</li></Link>
                    <Link href="/nft"><li className="text-lg cursor-pointer">NFT</li></Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header;