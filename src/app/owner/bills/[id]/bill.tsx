"use client"

import { PlateView } from "@/components/plate-editor";
import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Bill({ bill }: { bill: any }) {

    const handlePay = () => {
        window.location.href = `http://localhost:8888/order/create_payment_url?id=${bill.id}`
    }
    return (
        <div>
            <Button onClick={() => handlePay()} size={"icon"} className="rounded-full top-[6.5rem] left-[90vw] sticky z-[70]">
                <CircleDollarSign />
            </Button>
            <PlateView content={bill.content} />
        </div>
    )
}