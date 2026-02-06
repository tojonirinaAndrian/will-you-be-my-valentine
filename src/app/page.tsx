"use client";
import Image from "next/image";
import { useState, useTransition } from "react";

interface stageInterface {
  noText: string,
  gifLink: string, fontSize: number
}

export default function Home() {
  const stages: stageInterface[] = [
    {
      noText: "no",
      gifLink: "/gifs/1.gif", fontSize: 0
    }, {
      noText: "Really sure ?",
      gifLink: "/gifs/2.gif", fontSize: 10
    }, {
      noText: "Baby, pleeeasse ?",
      gifLink: "/gifs/3.gif", fontSize: 20
    }, {
      noText: "Just think about it",
      gifLink: "/gifs/4.gif", fontSize: 25
    }, {
      noText: "If you say no, I'll be sad",
      gifLink: "/gifs/5.gif", fontSize: 40,
    }, {
      noText: "Baby, Just say yes",
      gifLink: "/gifs/6.gif", fontSize: 70
    }, {
      noText: "",
      gifLink: "/gifs/7.gif", fontSize: 0
    }
  ]
  const [where, setWhere] = useState<number>(1);
  const onNoClick = () => {
    setWhere(where+1)
  }
  const onYesClick = () => {
    setWhere(7);
  };
  const mineAudio = new Audio("/audio/mine.mpeg");
  const [trynaPlay, startPlaying] = useTransition();
  const [choosed, setChoosed] = useState<boolean>(false);
  const onPlayClick = () => {
    console.log("will play the song now!");
    startPlaying (async () => {
      await mineAudio.play();
    });
  }
  return (
    <>
    {!choosed && <div className="w-screen h-screen bg-black/80 fixed top-0 right-0 flex justify-center items-center p-3">
      <div className="bg-white p-5 space-y-3 rounded-xl w-full md:w-[30dvw] text-center">
        <p className="font-2xl font-semibold">Play music ?</p>
        <div className="w-full md:flex flex-col md:flex-row *:w-full *:rounded-md *:p-3 gap-1 *:cursor-pointer">
          <button className="bg-green-400 text-green-900"
          onClick={() => {
            onPlayClick(); 
            setChoosed(true)
          }}
          >Continue with music</button>
          <button className="bg-blue-200 text-blue-700"
          onClick={() => setChoosed(true)}
          >Continue without music</button>
        </div>
      </div>
    </div>}
    <div
    className="flex min-h-screen items-center justify-center dark:bg-black overflow-hidden p-10 bg-red-50"
    >
      {trynaPlay && <div className="text-center text-red-700 text-xl">Music loading...</div>}
      {choosed && <>
        <main className="flex flex-col gap-3 justify-center items-center text-center">
          <div className="md:w-[25dvw] w-[50dvw]">
            <Image src={`${stages[where-1].gifLink}`} alt={`${stages[where-1].gifLink}`} width={5000} height={5000}
            className="w-full rounded-xl"
            />
          </div>
          {(where !== 7) ? <>
            <div className="w-screen">
              <p className="font-semibold text-xl text-red-500">Will you be my valentine ?</p>
            </div>
            <div className="w-full p-3 justify-center flex gap-2 *:p-3 *:rounded-md *:text-white *:font-medium *:capitalize *:cursor-pointer *:px-5 *:h-fit items-center">
              <button className={`bg-green-600`}
              style={
                {
                  fontSize: `${where !== 1 && stages[where-1].fontSize}dvw`
                }
              }
              onClick={onYesClick}
              >Yes</button>
              {(where !== 6) && <button className="bg-red-600"
              onClick={onNoClick}
              >{stages[where-1].noText}</button>}
            </div>
          </> : <>
              <div className="text-center font-semibold text-6xl text-red-500">Thank you Malala</div>
          </>}
        </main>
      </>}
    </div>
    </>
    
  );
}
