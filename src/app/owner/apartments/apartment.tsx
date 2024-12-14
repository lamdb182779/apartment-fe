"use client"

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

export default function Apartment({ apartment }: { apartment: any }) {
    return (
        <AccordionItem value={apartment.number}>
            <AccordionTrigger>
                Căn hộ {apartment.number}
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
                <div className="grid grid-cols-3">
                    <div>
                        Tầng
                    </div>
                    <div>
                        {apartment.floor}
                    </div>
                    <Link className="text-end" href={`/owner/apartments/${apartment.number}`} >Xem chi tiết</Link>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Trục
                    </div>
                    <div className="col-span-2">
                        {apartment.axis}
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Diện tích
                    </div>
                    <div className="col-span-2">
                        {apartment.acreage}
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Người thuê
                    </div>
                    <div className="col-span-2">
                        {apartment.tentants?.length > 0 ?
                            <>
                                {apartment.tentants.map((tentant: any) => <>{tentant}<br /></>)}
                            </>
                            :
                            <>Không có người thuê</>
                        }
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}