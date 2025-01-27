"use client";

import {ConvexReactClient ,Authenticated, Unauthenticated,AuthLoading} from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {ClerkProvider,useAuth,SignIn} from "@clerk/nextjs"
import { FullscreenLoader } from "./fullscreen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk
                useAuth={useAuth}
                client={convex}
            >
                <Authenticated>
                {children}
                </Authenticated>
                <Unauthenticated>   
                    <div className="flex flex-col justify-center items-center min-h-screen">
                        <SignIn routing="hash" />
                   </div>
                </Unauthenticated>
                <AuthLoading>   
                    <FullscreenLoader label="Loading..." />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
    
} 