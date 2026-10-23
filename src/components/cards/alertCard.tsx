"use client"
        
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import React from "react";
import { cn } from "@/lib/utils"; 
import { forbidden } from "next/navigation";

interface AlertCardProps {
  _animationKey: number;
  value: React.ReactNode;
  className?: string;
}

export default function AlertCard({
  _animationKey: animationKey = 0,
  value: messageContents = "",
  className

}: AlertCardProps) {

  const vendor: string = navigator.vendor;
  const platform: string = navigator.platform;

  const createRegexText = (targetString: string, forbiddens: string[]): string => {
    if(targetString != null) {
      const regex = new RegExp(`\\b(${forbiddens.join('|')})\\b`, 'gi');
      return targetString.toLowerCase().replace(regex, "").replace(/\s+/g, " ").trim();
    }

    return "";
  }

    return(
        <div 
          key={`alert-${animationKey}`} 
          className={cn(
            "flex-1 animate-fade-out z-20", 
            className
          )}
        >
          <Alert className="flex flex-col w-full h-full p-4 sm:p-6 bg-(--app-theme-color-terminal-background) outline-4 outline-offset-4 shadow-2xl">
            <AlertTitle className="text-base sm:text-xl font-bold text-(--app-theme-color-terminal-font) leading-tight">
              Really important message
            </AlertTitle>
            <AlertDescription className="text-sm sm:text-lg leading-snug mt-1 text-(--app-theme-color-terminal-font) wrap-break-words">
              <p className="mt-8">Last login: {Date().toLocaleLowerCase()}</p>
              <span className="animate-blink">&gt; </span>
              <span>
              @{createRegexText(platform, ["inc", ",", "."])}/{createRegexText(vendor, ["inc", ",", "."])} -- {messageContents}
              </span>
            </AlertDescription>
          </Alert>
        </div>
    )
}