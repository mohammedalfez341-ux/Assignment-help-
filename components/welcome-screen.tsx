
'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, BookOpenCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WelcomeIcon = () => (
    <BookOpenCheck className="h-8 w-8 text-primary mx-auto" />
);


export function WelcomeScreen() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30 p-4 overflow-auto">
            <div className="text-center space-y-3 max-w-xl">
                <WelcomeIcon />
                <h1 className="text-2xl md:text-3xl font-bold text-primary">
                    Welcome to Assignment Help!
                </h1>
                <p className="text-md text-muted-foreground">
                    Your central hub for accessing and managing academic assignments with ease.
                </p>
                <div className="relative mx-auto w-24 h-24 rounded-xl overflow-hidden shadow-lg my-3">
                    <Image 
                        src="https://placehold.co/256x256.png" 
                        alt="App Icon Placeholder" 
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                        data-ai-hint="abstract geometric" 
                    />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    Navigate through subjects using the sidebar, select an assignment, and view PDF documents or their web versions directly in this preview panel.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
                    <Card className="flex items-start space-x-3 p-3 bg-background">
                        <Search className="text-accent flex-shrink-0 mt-1 h-5 w-5" />
                        <div>
                            <h3 className="font-semibold text-primary">Easy Navigation</h3>
                            <p className="text-sm text-muted-foreground">Quickly find subjects and assignments.</p>
                        </div>
                    </Card>
                    <Card className="flex items-start space-x-3 p-3 bg-background">
                        <FileText className="text-accent flex-shrink-0 mt-1 h-5 w-5" />
                        <div>
                            <h3 className="font-semibold text-primary">Dual Format Viewing</h3>
                            <p className="text-sm text-muted-foreground">View as PDF or Webpage.</p>
                        </div>
                    </Card>
                </div>
                <div className="pt-2">
                    <Button asChild size="default" className="shadow-md">
                        <Link href="/about-us">
                            Learn More About Our Features
                        </Link>
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                    Select an assignment from the sidebar to begin.
                </p>
            </div>
        </div>
    );
}
