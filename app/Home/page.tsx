"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Root.module.css";
import { Typewriter } from "react-simple-typewriter";
import RootWrapper from "../RootWrapper";

export default function Home() {
    return (
        <RootWrapper>
            <main className="px-10 flex justify-around items-center">
                <div className="flex flex-col gap-6">
                    <h1 className="font-black text-6xl">
                        <span style={{ color: "black", fontWeight: "bold" }}>
                            <Typewriter
                                words={[
                                    "What is Mentorify",
                                    "AI Based guidance",
                                ]}
                                loop={1000}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>
                    </h1>
                    <p className="text-xl">
                        Mentorify is a interactive AI based model to help
                        students choose careers and know their capabilities
                    </p>
                    <Link
                        href="/Career"
                        className={`font-bold text-xl max-w-max py-3 px-10 rounded-sm transition-all ease-in-out duration-400 ${styles.button} relative`}
                    >
                        <p className={styles.p}>Get Started</p>
                    </Link>
                </div>
                <div>
                    <Image
                        src="/careerup.png"
                        alt="Swap ai"
                        width={400}
                        height={400}
                    />
                </div>
            </main>
        </RootWrapper>
    );
}
