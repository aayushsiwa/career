"use client";

import Head from "next/head";
import RiveHero from "@/components/RiveHero";

export default function Home() {
    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="/hero_use_case_v5.riv"
                    as="fetch"
                    crossOrigin="anonymous"
                />
            </Head>
            <main className="block relative w-screen h-screen">
                <RiveHero />
            </main>
        </>
    );
}
