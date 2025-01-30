"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { getUsers } from "./action";

type User = {
    id: string;
    name: string;
    avatar: string;
}

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    const [user, setUser] = useState<User[]>([])
    
    const fetchUsers = useMemo(() => async () => {
        try {
            const list = await getUsers()
            setUser(list)
        } catch (error) {
            console.error(error)
        }
    }, [])
    

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return (
        <LiveblocksProvider
            authEndpoint={"/api/liveblocks-auth"}
            throttle={16}
            resolveUsers={({ userIds }) => {
                return userIds.map((userId) => user.find((item) => item.id === userId) ?? undefined) 
            }}
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = user
                if (text) {
                    filteredUsers = user.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
                }
                return filteredUsers.map((item) => item.id)
            }}
            resolveRoomsInfo={() => []}
        >
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<FullscreenLoader label="Loading document..." />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}