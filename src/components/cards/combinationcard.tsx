"use client"

import React, { JSX, useEffect, useRef} from 'react';
import{ motion, Variants } from "motion/react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { FocusableElement } from 'react-aria-components';
import { COLORS, getRgba } from '../../app/(utils)/getRgba';
import { cn } from "@/lib/utils"; 

export enum ButtonType {
  submit = "SUBMIT",
  hint = "HINT"
}

const baseButtonVarients: Variants = {
  initial: {x: 0, borderWidth: 1},
  hidden: { opacity: 0},
  visible: { opacity: 1},
}

export const buttonVariants = (mainColor: string): Record<ButtonType, Variants> =>
  {
    return {
    [ButtonType.hint]: {
      ...baseButtonVarients,
        hover: { 
          backgroundColor: mainColor,
          scale: 1.1, 
          x: -12, 
          boxShadow: "0px 0px 5px 0px " + mainColor,
          borderWidth: 0,
          transition: { duration: 0.2},
        },
    },
    [ButtonType.submit]: {
      ...baseButtonVarients,
        hover: { 
          scale: 1.1,
          backgroundColor: mainColor,
          x: 12, 
          borderWidth: 0,
          boxShadow: "0px 0px 5px 0px " + mainColor,
          transition: { duration: 0.2},
        },
    }
  }
  }

interface CombinationCardProps {
  secretCode: number;
  inputValue: string;
  titleText?: JSX.Element;
  bodyText?: JSX.Element;
  onSubmitCode?: (code: string, event: React.SubmitEvent) => void;
  onHintActive?: () => void;
  onInputChanged: (userInput: string) => void;
  className?: string;
}

export default function CombinationCard({
  secretCode: code = 100000, 
  inputValue: value,
  titleText: titleValue,
  bodyText: bodyValue,
  onSubmitCode, 
  onHintActive, 
  onInputChanged,
  className
}: CombinationCardProps) {

  const SECRET_COMBO_ARRAY = Array.from(String(code), Number);
  const correctColorClass = "text-green-600 font-bold bg-white/10 pointer-events-none";
  const normalColorClass = "text-white";

  const prevLockedReference = useRef<boolean[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (inputVal: string) => {
    let nextVal = "";

    if (inputVal.length < value.length) {
      const updatedCharacters = value.split('');

      for (let i = updatedCharacters.length - 1; i >= 0; i--) {
        const isLocked = Number(updatedCharacters[i]) === SECRET_COMBO_ARRAY[i];

        if (!isLocked) {
          updatedCharacters.splice(i, 1);
          break;
        }
      }

      nextVal = updatedCharacters.join('');
    } else {
      let lockedResult = "";
      const maxLength = SECRET_COMBO_ARRAY.length;

      for (let i = 0; i < maxLength; i++) {
        const existingCharacter = value[i];
        const inputCharacter = inputVal[i];
        const targetDigit = String(SECRET_COMBO_ARRAY[i]);

        if (existingCharacter === targetDigit) {
          lockedResult += existingCharacter;
        } else if (inputCharacter !== undefined) {
          lockedResult += inputCharacter;
        }
      }

      nextVal = lockedResult;
    }

    onInputChanged(nextVal);
  };

  const handleSubmit = (event: React.MouseEvent<FocusableElement>) => {
    if(onSubmitCode)
    onSubmitCode(value, event as unknown as React.SubmitEvent);
  };

  const isNewlyLocked = (index: number) => {
  const isCurrentlyLocked = currentLockedState[index];
  const wasLockedBefore = prevLockedReference.current[index] ?? false;
  return isCurrentlyLocked && !wasLockedBefore;
};

const currentLockedState = SECRET_COMBO_ARRAY.map((digit, i) => {
  const userDigit = value[i];
  return userDigit !== undefined && Number(userDigit) === digit;
});
   


// Updating ref after every render 
useEffect(() => {
  inputRef.current?.focus();

  prevLockedReference.current = currentLockedState;
}, [currentLockedState]);

  return (
    <div className={cn("flex flex-col overflow-hidden w-full h-auto gap-4 sm:gap-4 bg-linear-to-t from-white/0 to-black/50 border-t-2 border-l-2 border-r-2 border-white/30 rounded-4xl shadow-2xl mx-auto", className)}>
      <div className="p-4 sm:p-8 mb-auto">
       {titleValue}
        <br />
        {bodyValue}
      </div>
      <div className="flex justify-center w-full max-w-full min-w-0 px-4 sm:px-16">
        <InputOTP 
          maxLength={SECRET_COMBO_ARRAY.length} 
          ref={inputRef}
          value={value}
          onChange={handleInputChange} 
          pattern={REGEXP_ONLY_DIGITS}
          className="w-full justify-center max-w-full relative"
        >
          <InputOTPGroup className="flex-auto justify-center flex-nowrap">
            {SECRET_COMBO_ARRAY.map((digit, i) => {
              const isCorrect = currentLockedState[i];
              const newlyLocked = isNewlyLocked(i);

              return (
                <motion.div 
                  key={i} 
                  animate={
                    isCorrect 
                      ? { 
                          scale: [1, 1.15, 1], 
                          borderColor: "rgba(8, 13, 20, 0.5)", 
                          boxShadow: "0px 0px 20px rgba(8, 13, 20, 1)" 
                        } 
                      : { 
                          scale: 1, 
                          borderColor: "rgba(255, 255, 255, 0.3)", 
                          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" 
                        }
                  }

                  transition={
                    
                    isCorrect 
                      ? { type: "keyframes", duration: 0.3, ease: "easeOut" } 
                      : { type: "spring", stiffness: 500, damping: 20 }
                  }
                  className={`flex-1 text-center aspect-square items-center justify-center sm:size-14 min-w-14 ${isCorrect ? "animate-bounce" : ""}`}
                  //className="flex-1 max-w-12 sm:max-w-16 aspect-square min-w-0 flex items-center justify-center rounded-lg overflow-hidden"
                  
                >
                  <InputOTPSlot 
                    index={i}
                    className={`w-full h-full text-2xl sm:text-4xl font-black ${isCorrect ? correctColorClass : normalColorClass}`}
                  />
                </motion.div>
              );
            })}
          </InputOTPGroup>
        </InputOTP>
      </div>
            {/* Hint/Submit buttons*/}
      <div className="w-full flex flex-row mt-auto pt-8">
        <motion.button
          onClick={onHintActive}
          variants={buttonVariants(getRgba(COLORS.vibrantOrange, 0.8))[ButtonType.hint]} 
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="click"

          className="w-1/2 h-14 sm:h-20 rounded-none rounded-bl-3xl border-t border-t-white/20"
        >
          <span className="text-base sm:text-xl font-semibold">Hint</span>
        </motion.button>
        <motion.button 
          onClick={handleSubmit} 
          variants={buttonVariants(getRgba(COLORS.neonGreen, 0.8))[ButtonType.submit]}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="click"
          className="w-1/2 h-14 sm:h-20 rounded-none rounded-br-3xl border-t border-t-white/20 text-white"
        >
          <span className="text-base sm:text-xl font-semibold">Submit</span>
        </motion.button>
      </div>
    </div>
  );}