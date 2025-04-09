"use client"

import { useState } from "react"
import Apartment from "./apartment"

export default function Apartments({ data }: { data: any }) {
    const [apartments, setApartments] = useState(data)

    return (
        <>
            <div className="w-[50vw] space-y-5">
                {apartments?.length > 0 &&
                    <>
                        {apartments.map((apartment: any) =>
                            <Apartment apartment={apartment} />
                        )}
                    </>
                }
            </div>
        </>
    )
}