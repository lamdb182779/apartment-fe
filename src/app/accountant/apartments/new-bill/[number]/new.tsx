"use client"

import { PlateEditor } from "@/components/plate-editor"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react"

export default function NewBill({
    number,
    month

}: {
    number: number
    month?: string
}) {
    const plateRef = useRef(null)

    return (
        <div className="space-y-2">
            <Label>Hóa đơn đến căn hộ {number}</Label>
            <PlateEditor ref={plateRef} />
            <Button onClick={() => console.log((plateRef?.current as any)?.children)}>clickme</Button>
        </div>
    )
}   