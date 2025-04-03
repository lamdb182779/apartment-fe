"use client"

import { PlateView } from "@/components/plate-editor";

export default function Notification({ notification }: { notification: any }) {
    return (
        <>
            <h5>{notification.title}</h5>
            <div className="whitespace-pre-line text-xs">{notification.describe}</div>
            <PlateView content={notification.content} />
        </>
    )
}