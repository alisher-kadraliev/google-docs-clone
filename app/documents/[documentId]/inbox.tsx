"use client"
import { ClientSideSuspense } from "@liveblocks/react"
import { useInboxNotifications } from "@liveblocks/react/suspense"
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui"
import { BellIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const Inbox = () => {
    return (
        <ClientSideSuspense fallback={null}>
            <InboxMenu />
       </ClientSideSuspense>
    )
}

const InboxMenu = () => {
    const {inboxNotifications} = useInboxNotifications()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative" size="icon" >
                    <BellIcon className="size-5" />
                    {inboxNotifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center">
                            {inboxNotifications.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto">
                    {inboxNotifications.length > 0 ? (
                    <InboxNotificationList >
                        {inboxNotifications.map((inboxNotification) => (
                            <InboxNotification key={inboxNotification.id} inboxNotification={inboxNotification} />
                        ))}
                        </InboxNotificationList>
                    ) : (
                        <DropdownMenuItem>No notifications</DropdownMenuItem>
                    )}
            </DropdownMenuContent>
        </DropdownMenu>

    )
}