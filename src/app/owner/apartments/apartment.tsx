"use client"
import Link from "next/link"
import apart from "@/assets/apartment-avatar.jpeg"
import Image from "next/image"

export default function Apartment({ apartment }: { apartment: any }) {
    return (
        <div className="rounded-lg border col-span-1 cursor-pointer">
            <Image
                className="object-cover object-center rounded-t-lg"
                src={apartment?.image ? apartment.image : apart}
                alt={apartment.number || ""} />
            <div className="p-5 text-sm">
                <div className="font-semibold">Căn hộ {apartment.number}</div>
                { }
            </div>
        </div>

    )
}