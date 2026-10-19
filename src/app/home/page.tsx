"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import CombinationCard from "@/components/cards/combinationcard";
import FloatingAnimation from "@/components/animations/Floating_Animations";

import AlertCard from "@/components/cards/alertCard";

export default function Home() {
  const [inputCode, setInputCode] = useState("");
  const [initCode, setInitCode] = useState(0);
  const [firstRun, setFirstRun] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hintActive, setHintActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>("");

  const router = useRouter();
  const max: number = 999999;
  const min: number = 100000;

  function GenerateRandomInt() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const handleInputChange = (val: string) => {
    setInputCode(val);
  }

  const handleCodeSubmit = async (code: string, event: React.SubmitEvent) => {
    event.preventDefault();
    setInputCode(code);

    //correct
    if (code.toString() === initCode.toString()) {
      
      await fetch("/api/attemptsMetric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "correct" }),
      });

      if(document.startViewTransition()) {
        document.startViewTransition(async () => {
          await router.push("/dashboard");
        })
      }
      else {
        router.push("/dashboard");
      }
      return;
      }
      else {
      //incorrect
      await fetch("/api/attemptsMetric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "incorrect" }),
      });

      setAlertMessage("Perhaps you need a little hint? Press 'Hint' for a... hint");
      
      setAnimationKey((prev) => prev + 1);
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 6000));
      setIsSubmitting(false);
    }
  };

  const handleHintActive = async () => {
    setAlertMessage((`Definitely not ${initCode}`))
    setAnimationKey((prev) => prev + 1);
    setHintActive(true);

    await new Promise((resolve) => setTimeout(resolve, 4000));
    setHintActive(false);
  };

    useEffect(() => {
    if (firstRun === false) {
      setInitCode(GenerateRandomInt());
      setFirstRun(true);
    }

    let visitorId = localStorage.getItem("visitor_id");

    if(!visitorId) {
        visitorId = `usr_${Math.random().toString(36).substring(2, 11)}`;
        localStorage.setItem("visitor_id", visitorId);
      }

      fetch("api/activeUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ visitorId }),
    }).catch((err) => console.error("Could not report online presence:", err));

    const handleUnload = () => {
    const load = JSON.stringify({ visitorId });
    const blob = new Blob([load], { type: "application/json" });

    navigator.sendBeacon("/api/activeUsers", blob);
    }

      window.addEventListener("beforeunload", handleUnload);
  });

return (
  <div className="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-8 z-10 bg-hero-pattern bg-cover">
      <div className="flex w-full h-full absolute mask-t-to-50% opacity-75">
        <FloatingAnimation colorStops={["#080D14", "#00D2FF"]} amplitude={3} speed={0.7} blend={-1}/>
      </div>
    <main className="flex flex-col items-center justify-center h-auto w-full max-w-xl bg-blue-300/10 backdrop-blur-sm">        
      <motion.div

      initial=
      {
        {
          x:-1000,
          opacity: 0,
        }
      }

      animate=
      {
        {
          x:[-1000, 50, 0],
          opacity: [0, 0, 1],        
        }
      }
      
      transition=
      {
        {
          duration: 0.5
        }
      }
      >
        <motion.div
        initial=
        {
        {
          boxShadow: "0px 0px 50px rgba(0, 180, 216, 0)",
        }
      }

        animate={
          {
          boxShadow: ["0px 0px 0px rgba(0, 180, 216, 0)", "0px 0px 50px rgba(0, 180, 216, 1)", "0px 0px 50px rgba(0, 180, 216, 0)"],

        }
      }

        transition=
        {
          {
        repeat: Infinity,
        repeatType: "loop",
        duration: 4,
        ease: "linear",
        }
      }
        >
        <CombinationCard
          secretCode={initCode} 
          inputValue={inputCode} 
          titleText={(
          <h1 className= "text-6xl sm:text-6xl text-white text-center">
            Operation:
            <span className="text-orange-400 mask-b-from-50% font-bold relative top-4"> OVERTHINK</span>
          </h1>)}
          bodyText={(
            <p className="text-xl sm:text-2xl text-gray-200 text-center">
              There is definitely something extremely important hidden behind this wall.
          </p>
          )}
          onHintActive={handleHintActive} 
          onSubmitCode={handleCodeSubmit} 
          onInputChanged={handleInputChange}
          className={hintActive ? "blur-sm" : ""}
        />
      </motion.div>
      </motion.div>
      <AnimatePresence>
        {(isSubmitting || hintActive) && (
          <motion.div
          initial={{opacity: 0, x:-20}} animate={{opacity: 1, x:0}} exit={{ opacity: 0}} transition={{duration: 0.5}} className="absolute inset-0 w-full h-full flex items-center justify-center">
            <AlertCard _animationKey={0} value={alertMessage} className="w-full h-full"/>
          </motion.div>)}
      </AnimatePresence>
        </main>
        </div>
)
}
