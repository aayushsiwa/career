"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import styles from "@/styles/styles.module.css";
import RootWrapper from "@/app/RootWrapper";

export default function Page({ params }: { params: { name: string } }) {
    let { name } = params;

    const displayName = name.replace(/-/g, " ");

    const [imageURL, setImageURL] = useState<string | null>(null);
    const [response, setResponse] = useState<string>("");
    const [output, setOutput] = useState("The response will appear here...");
    const [loading, setLoading] = useState(false);

    const getImage = useCallback(async (careerName: string) => {
        try {
            const res = await fetch("/api/imagen", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ displayName: careerName }),
            });
            const data = await res.json();
            if (data.imageURL) setImageURL(data.imageURL);
        } catch {
            // fail silently or notify user
        }
    }, []);

    const onSubmit = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        setOutput("The response will appear here...");
        setResponse("");

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userPrompt: `Can you give me a roadmap to start a career in ${displayName} and what are the career options available in ${displayName}?`,
                }),
            });
            const data = await res.json();
            setResponse(data.text || "");
            // Optionally get image after chat response
            // await getImage(displayName);
        } catch {
            setResponse("Failed to load response.");
        } finally {
            setLoading(false);
        }
    }, [displayName, loading]);

    useEffect(() => {
        if (!response) return;
        setOutput("");

        let timeoutIds: NodeJS.Timeout[] = [];
        for (let i = 0; i < response.length; i++) {
            const timeoutId = setTimeout(() => {
                setOutput((prev) => prev + response[i]);
            }, i * 10);
            timeoutIds.push(timeoutId);
        }

        return () => timeoutIds.forEach(clearTimeout);
    }, [response]);

    return (
        <RootWrapper>
            <main className="flex flex-col items-center min-h-screen gap-6 p-6">
                <h1 className="text-4xl font-extrabold mt-1 capitalize">
                    {displayName}
                </h1>

                {imageURL && (
                    <Image
                        src={imageURL}
                        alt={`${displayName} illustration`}
                        width={300}
                        height={300}
                        priority
                    />
                )}

                <h2 className="text-xl font-semibold text-center max-w-3xl">
                    Creating a response for the capabilities required and career
                    options in{" "}
                    <span className="text-red-500 capitalize">{displayName}</span>
                </h2>

                <Card
                    className={cn(
                        "p-5 whitespace-normal max-w-full min-w-[320px] sm:w-[500px] md:min-w-[600px]",
                        styles.textwrapper
                    )}
                >
                    <Markdown className="w-full h-full">{output}</Markdown>
                </Card>

                <Button onClick={onSubmit} disabled={loading}>
                    {loading ? "Loading..." : "Get Details"}
                </Button>
            </main>
        </RootWrapper>
    );
}
