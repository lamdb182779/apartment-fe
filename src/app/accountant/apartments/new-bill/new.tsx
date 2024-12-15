"use client"

import { useState } from "react"
import useSWR from "swr"

export default function NewBill({ number }: { number?: number }) {
    const floors = Array.from({ length: 20 }, (_, i) => i + 1)
    const [floor, setFloor] = useState(1)
    const { data, isLoading } = useSWR(`/apartments/ownered?floor=${floor}`)

    return (
        <div>
            {/* <PlateEditor /> */}
        </div>
    )
}   