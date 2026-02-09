"use client";
import Image from "next/image";
import { useRef, useState, useTransition, useEffect } from "react";
import { Howl } from "howler";
import axios from "axios";

interface stageInterface {
  noText: string;
  gifLink: string;
  fontSize: number;
}

export default function Home() {
  const FORMSPREE_URL: string = "https://formspree.io/f/xdalkzja";
  const stages: stageInterface[] = [
    {
      noText: "No",
      gifLink: "/gifs/1.gif",
      fontSize: 0,
    },
    {
      noText: "Really sure ?",
      gifLink: "/gifs/2.gif",
      fontSize: 10,
    },
    {
      noText: "Baby, pleeeasse ?",
      gifLink: "/gifs/3.gif",
      fontSize: 20,
    },
    {
      noText: "Just think about it",
      gifLink: "/gifs/4.gif",
      fontSize: 25,
    },
    {
      noText: "If you say no, I'll be sad",
      gifLink: "/gifs/5.gif",
      fontSize: 40,
    },
    {
      noText: "Baby, Just say yes",
      gifLink: "/gifs/6.gif",
      fontSize: 70,
    },
    {
      noText: "",
      gifLink: "/gifs/7.gif",
      fontSize: 0,
    },
  ];

  const [where, setWhere] = useState<number>(1);
  const onNoClick = () => {
    setWhere(where + 1);
  };

  const onYesClick = async () => {
    setWhere(7);
    // TODO : send email
    const response = await axios.post(FORMSPREE_URL, {
      name: name,
      message: `yes , ${name} will you be the valentine.`,
    });
    console.log(response);
  };

  const [trynaPlay, startPlaying] = useTransition();
  const [choosed, setChoosed] = useState<boolean>(false);
  const audioRef = useRef<Howl | null>(null);
  const [name, setName] = useState<string>("");
  const [musicOnOff, setMusicOnOff] = useState<boolean>(true);

  useEffect(() => {
    const mineAudio = new Howl({
      src: ["/audio/mine.mpeg"],
      volume: 0.5,
      loop: true,
    });
    audioRef.current = mineAudio;
  }, []);

  const onContinueClick = () => {
    musicOnOff &&
      startPlaying(() => {
        audioRef.current?.play();
        audioRef.current?.fade(0, 1, 1000);
      });
    setChoosed(true);
  };

  return (
    <>
      {!choosed && (
        <div className="w-screen h-screen bg-black/70 fixed top-0 right-0 flex justify-center items-center p-3">
          <div className="bg-white p-5 space-y-3 rounded-xl w-full md:w-[30dvw]">
            <div>
              <p className="text-black/60">Name</p>
              <input
                onChange={(e) => setName(e.target.value.trim())}
                type="text"
                className="p-2 w-full border outline-red-400 border-red-100 bg-red-50/50 rounded-md"
                placeholder="your name..."
              />
            </div>
            <div>
              <p className="text-black/60">Play with music on ?</p>
              <div className="flex w-full gap-1 *:p-2">
                <button
                  onClick={() => !musicOnOff && setMusicOnOff(true)}
                  className={`w-full rounded-md border border-slate-600 ${musicOnOff ? "bg-slate-600 text-white" : "bg-slate-100/50 text-slate-600"}`}
                >
                  With music
                </button>
                <button
                  onClick={() => musicOnOff && setMusicOnOff(false)}
                  className={`w-full rounded-md border border-slate-600 ${!musicOnOff ? "bg-slate-600 text-white" : "bg-slate-100/50 text-slate-600"}`}
                >
                  Without music
                </button>
              </div>
            </div>
            <button
              className={`w-full p-3 text-center bg-red-600 text-white rounded-md ${name.length <= 0 && "opacity-20"}`}
              onClick={() => {
                !(name.length <= 0) && onContinueClick();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div className="flex min-h-screen items-center justify-center dark:bg-black overflow-hidden p-10 bg-red-100/70">
        {trynaPlay && (
          <div className="text-center text-red-700 text-xl font-semibold">
            Music loading...
          </div>
        )}
        {(choosed && !trynaPlay) && (
          <>
            <main className="flex flex-col gap-3 justify-center items-center text-center">
              <div className="md:w-[25dvw] w-[50dvw]">
                {stages.map((stage) => {
                  return (
                    <Image
                      priority
                      key={stage.gifLink}
                      src={`${stage.gifLink}`}
                      alt={`${stage.gifLink}`}
                      width={500}
                      height={500}
                      className={`${stage.gifLink === stages[where - 1].gifLink ? "block" : "hidden"} shadow-sm w-full rounded-md`}
                    />
                  );
                })}
              </div>
              {where !== 7 ? (
                <>
                  <div className="w-screen">
                    <p className="text-2xl text-red-500">
                      Will you be my valentine ?
                    </p>
                  </div>
                  <div className="w-full p-3 justify-center flex gap-2 *:p-3 *:rounded-md *:text-white *:font-medium *:cursor-pointer *:px-5 *:h-fit items-center">
                    <button
                      className={`bg-green-600`}
                      style={{
                        fontSize: `${where !== 1 && stages[where - 1].fontSize}dvw`,
                      }}
                      onClick={onYesClick}
                    >
                      Yes
                    </button>
                    {where !== 6 && (
                      <button className="bg-red-600" onClick={onNoClick}>
                        {stages[where - 1].noText}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center text-6xl text-red-500">
                    Thank you Malala
                  </div>
                </>
              )}
            </main>
          </>
        )}
      </div>
    </>
  );
}
