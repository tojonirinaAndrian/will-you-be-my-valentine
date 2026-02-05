"use client";
import Image from "next/image";

interface stagesInterface {
  noText: string,
  gifLink: string
}

export default function Home() {
  const stages: stagesInterface[] = [
    {
      noText: "no",
      gifLink: "/videos/1"
    }
  ]
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-100 dark:bg-black overflow-hidden">
      <main className="flex flex-col gap-3">
        <div className="w-full md:w-[40%]">
          <video src="/videos/1"></video>
        </div>
        <p className="font-bold text-xl text-red-500">Will you be my valentine</p>
      </main>
    </div>
  );
}
