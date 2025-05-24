"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import styles from "@/styles/Root.module.css";

export default function RootWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL || "";

    // Hide nav and wrapper for homepage
    if (pathname === "/") {
        return <>{children}</>;
    }

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div className={`${showMenu ? "overflow-hidden h-screen" : ""}`}>
            <nav className="relative">
                <div className="flex p-10 items-center justify-between font-bold pb-40">
                    <div className="flex items-center gap-3">
                        <Link href="/Home" className="flex items-center">
                            <h1 className="text-3xl text-red-500">H</h1>
                            <h1 className="text-xl">ustleHop</h1>
                        </Link>
                    </div>

                    <div
                        className={`flex flex-col gap-1 transition-all ease-in-out duration-300 ${
                            styles.menu
                        } ${showMenu ? styles.click : ""}`}
                        onClick={toggleMenu}
                    >
                        <div
                            className={`w-8 h-1 bg-black ${styles.menuli}`}
                        ></div>
                        <div
                            className={`w-8 h-1 bg-black ${styles.menuli}`}
                        ></div>
                        <div
                            className={`w-8 h-1 bg-black ${styles.menuli}`}
                        ></div>
                    </div>

                    <div
                        className={`flex gap-8 items-center ${styles.menubar} ${
                            showMenu ? styles.click : ""
                        }`}
                    >
                        <ul className="flex gap-5">
                            <li>
                                <Link href="/Career" className={styles.a}>
                                    Career
                                </Link>
                            </li>
                            <li>
                                <Link href="/Chat" className={styles.a}>
                                    Chat
                                </Link>
                            </li>
                            <li>
                                {BLOG_URL && (
                                    <Link
                                        href={`${BLOG_URL}`}
                                        className={styles.a}
                                    >
                                        Blog
                                    </Link>
                                )}
                            </li>
                        </ul>
                        <UserButton />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <Link href="/Contact">Contact Us</Link>
                        </button>
                    </div>
                </div>
            </nav>

            {!showMenu ? children : null}
        </div>
    );
}
