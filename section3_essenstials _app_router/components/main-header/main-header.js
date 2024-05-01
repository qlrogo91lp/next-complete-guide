import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link href="/" className={classes.logo}>
                    {/* <img src={logoImg.src} alt='A plate with food on it' /> */}
                    <Image
                        src={logoImg}
                        alt="A plate with food on it"
                        priority
                    />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul className={classes.nav}>
                        <li>
                            <NavLink href='/meals'>Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href='/community'>Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
