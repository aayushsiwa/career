"use client";

import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { MessageCircleCode, Send, Copy, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import styles from "@/styles/styles.module.css";
import RootWrapper from "@/app/RootWrapper";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [output, setOutput] = useState("The response will appear here...");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            toast.error("Prompt cannot be empty!");
            return;
        }

        setOutput("The response will appear here...");
        setPrompt("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userPrompt: prompt }),
            });
            const data = await res.json();
            setLoading(false);

            if (data.error || !data.text) {
                toast.error(data.error || "No response from the server!");
                return;
            }

            setResponse(data.text);
        } catch {
            setLoading(false);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const copyOutput = () => {
        navigator.clipboard.writeText(output);
        toast.success("Copied to clipboard!");
    };

    const downloadOutput = () => {
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "chat.txt";
        anchor.click();
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        if (!response) return;
        setOutput("");
        for (let i = 0; i < response.length; i++) {
            setTimeout(() => setOutput((prev) => prev + response[i]), i * 10);
        }
    }, [response]);

    return (
        <RootWrapper>
            <main className="flex flex-col items-center px-4 py-10 gap-6">
                <Toaster />

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <MessageCircleCode size={52} className="text-primary" />
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Council
                    </h1>
                </div>

                {/* Prompt Input */}
                <div className="w-full max-w-3xl flex gap-2 items-center">
                    <div className="relative w-full">
                        <Input
                            type="text"
                            placeholder="Ask your question..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSubmit()
                            }
                            className="pr-12 h-[50px] text-base shadow-md rounded-xl"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {loading ? (
                                <BeatLoader size={8} color="#000" />
                            ) : (
                                <Send />
                            )}
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="w-full max-w-6xl flex gap-4 items-start">
                    <Card className="w-full min-h-[180px] max-h-[400px] overflow-y-auto p-6 rounded-xl shadow-md bg-background">
                        <div className={styles.textwrapper}>
                            <Markdown className="prose dark:prose-invert">
                                {output}
                            </Markdown>
                        </div>
                    </Card>
                    <div className="flex flex-col gap-3 mt-1">
                        <Button
                            variant="outline"
                            onClick={copyOutput}
                            className="w-[42px] h-[42px] p-1 rounded-xl"
                        >
                            <Copy className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={downloadOutput}
                            className="w-[42px] h-[42px] p-1 rounded-xl"
                        >
                            <Download className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </main>
        </RootWrapper>
    );
}
