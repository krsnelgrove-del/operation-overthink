"use client"

import React from 'react';
import { Button } from 'react-aria-components';
import { cn } from "@/lib/utils"; 
import Link from 'next/link';

interface SideBarButtonProps {
    iconUrl?: string,
    buttonText?: string;
    url?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function SideBarButton({
    iconUrl,
    buttonText, 
    url, 
    className,
    children
}: SideBarButtonProps) {
    const content = children || buttonText;


    if (url) {
        return (
            <Link 
                href={url} 
                className={cn(
                    "flex flex-col items-center justify-center rounded-lg p-4 text-white font-medium focus:outline-none focus:ring-1", 
                    className
                )}
            >   <img src={iconUrl}></img>
                {content}
            </Link>
        );
    }
    return (
        <Button 
            className={cn(
                "flex flex-col items-center justify-center rounded-lg p-4 text-white font-medium focus:outline-none focus:ring-1", 
                className
            )}
        >
            {content}
        </Button>
    );
}