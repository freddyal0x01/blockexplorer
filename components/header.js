import react from "react";
import Image from "next/image";

const Header = () => {
    return (
        <header>
            <Image 
                src="/web-link.svg"
                alt="Chain Logo"
                height={100}
                width={100}
            />
            <nav>
                <ul>
                    <li>Balance</li>
                    <li>NFT</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;