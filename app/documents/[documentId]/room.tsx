"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { getUsers, getDocuments } from "./action";
import { Id } from "@/convex/_generated/dataModel";

type User = {
    id: string;
    name: string;
    avatar: string;
}

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    const [users, setUser] = useState<User[]>([])
    
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
            authEndpoint={async () => {
                const endpoint = "/api/liveblocks-auth";
                const room = params.documentId as string;
                const response = await fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({room}),
                })
               return await response.json()
            }}
            throttle={16}
            resolveUsers={({ userIds }) => {
                return userIds.map(
                    (userId) => users.find((user) => user.id === userId) ?? undefined) 
            }}
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = users
                if (text) {
                    filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
                }
                return filteredUsers.map((user) => user.id)
            }}
            resolveRoomsInfo={async ({ roomIds }) => {
                const documents = await getDocuments(roomIds as Id<"documents">[])
                return documents.map((document) => ({
                    id: document.id,
                    name: document.name,
                }))
            }}
        >
            <RoomProvider id={params.documentId as string} initialStorage={{
                leftMargin: 56,
                rightMargin: 56,
            }}>
                <ClientSideSuspense fallback={<FullscreenLoader label="Loading document..." />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}