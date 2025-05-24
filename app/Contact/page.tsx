"use client";

import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import dynamic from "next/dynamic";
import RootWrapper from "../RootWrapper";

// Dynamically import client-only components to avoid SSR mismatch
const DynamicToaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: false,
});
const DynamicBeatLoader = dynamic(() => import("react-spinners").then((mod) => mod.BeatLoader), {
  ssr: false,
});

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // For debug: set env vars with defaults to avoid mismatch
  const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+1234567890";
  const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "email@example.com";
  const CONTACT_INSTAGRAM = process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM ?? "instagramUser";
  const CONTACT_LINKEDIN = process.env.NEXT_PUBLIC_CONTACT_LINKEDIN ?? "https://linkedin.com/in/user";
  const CONTACT_TWITTER = process.env.NEXT_PUBLIC_CONTACT_TWITTER ?? "https://twitter.com/user";
  const CONTACT_GITHUB = process.env.NEXT_PUBLIC_CONTACT_GITHUB ?? "https://github.com/user";

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validateName = (name: string) => /^[a-zA-Z ]{2,30}$/.test(name);

  const validateForm = () => {
    if (!validateName(name)) {
      toast.error("Please enter a valid name");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <RootWrapper>
      <DynamicToaster />
      <div className="flex flex-col lg:flex-row justify-around items-center mt-10 mb-10 px-4 lg:px-0">
        {/* Left Section */}
        <div className="flex flex-col items-center gap-10 mb-10 lg:mb-0">
          <div className="text-center">
            <h1 className="text-5xl font-black">Contact Us</h1>
            <p className="text-lg mt-3 max-w-xs">
              Fill out the form and I’ll get back to you within 24 hours.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-center">
            {CONTACT_PHONE && (
              <div className="flex items-center gap-3">
                <Image src="/phone-contact.png" alt="Phone" width={25} height={25} />
                <p>{CONTACT_PHONE}</p>
              </div>
            )}

            {CONTACT_EMAIL && (
              <div className="flex items-center gap-3">
                <Image src="/gmail.png" alt="Email" width={25} height={25} />
                <p>{CONTACT_EMAIL}</p>
              </div>
            )}
            {CONTACT_INSTAGRAM && (
              <div className="flex items-center gap-3">
                <Image src="/instagram.png" alt="Instagram" width={25} height={25} />
                <Link href={`https://www.instagram.com/${CONTACT_INSTAGRAM}/`} target="_blank">
                  <p>@{CONTACT_INSTAGRAM}</p>
                </Link>
              </div>
            )}
          </div>

          <div className="flex gap-6 mt-4">
            {CONTACT_LINKEDIN && (
              <Link href={CONTACT_LINKEDIN} target="_blank">
                <Image
                  src="/linkedin-contact.png"
                  alt="LinkedIn"
                  width={35}
                  height={35}
                  className="hover:scale-110 transition"
                />
              </Link>
            )}
            {CONTACT_TWITTER && (
              <Link href={CONTACT_TWITTER} target="_blank">
                <Image
                  src="/twitter.png"
                  alt="Twitter"
                  width={35}
                  height={35}
                  className="hover:scale-110 transition"
                />
              </Link>
            )}
            {CONTACT_INSTAGRAM && (
              <Link
                href={`https://www.instagram.com/${CONTACT_INSTAGRAM}/`}
                target="_blank"
              >
                <Image
                  src="/instagram-contact.png"
                  alt="Instagram"
                  width={35}
                  height={35}
                  className="hover:scale-110 transition"
                />
              </Link>
            )}
            {CONTACT_GITHUB && (
              <Link href={CONTACT_GITHUB} target="_blank">
                <Image
                  src="/github-contact.png"
                  alt="GitHub"
                  width={35}
                  height={35}
                  className="hover:scale-110 transition"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="flex justify-center">
            <Image src="/customer-service.png" alt="Support" width={70} height={70} />
          </div>

          <label className="flex flex-col gap-2 font-bold">
            Name:
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black rounded-lg px-3 py-1"
            />
          </label>

          <label className="flex flex-col gap-2 font-bold">
            Email:
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded-lg px-3 py-1"
            />
          </label>

          <label className="flex flex-col gap-2 font-bold">
            Message:
            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-black rounded-lg px-3 py-2 resize-none"
              rows={4}
            />
          </label>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white py-2 rounded-lg flex justify-center items-center gap-2 h-10"
          >
            {loading ? (
              <DynamicBeatLoader color="#fff" size={15} />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </RootWrapper>
  );
}
