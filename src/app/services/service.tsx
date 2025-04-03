"use client"

import { format } from "date-fns"
import { useRouter } from "next/navigation"

export default function Service({ service }: { service: any }) {
    const router = useRouter()
    const handleInfo = () => {
        router.push(`/services/${service.id}`)
    }
    return (
        <div onClick={() => handleInfo()} className="border-b relative cursor-pointer">
            <div className="text-sm">Căn hộ {service.apartment.number}
                <br /> {service.type}</div>
            <div className="text-xs italic">{format(service.startDate, "dd/MM/yyyy")} - {format(service.endDate, "dd/MM/yyyy")}</div>
            <div className="absolute italic top-0 right-0 text-xs">{service.status}</div>
        </div>
    )
}