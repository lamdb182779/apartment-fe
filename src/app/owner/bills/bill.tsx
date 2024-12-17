"use client"

import { useRouter } from "next/navigation"

export default function Bill({ bill }: { bill: any }) {
    const router = useRouter()
    const handleInfo = () => {
        router.push(`/owner/bills/${bill.id}`)
    }
    return (
        <div onClick={() => handleInfo()} className="py-3">
            {bill.title}<br />
            {bill.isPaid ? <span className="text-green-500">Đã thanh toán</span> : <span className="text-red-500">Chưa thanh toán</span>}
        </div>
    )
}