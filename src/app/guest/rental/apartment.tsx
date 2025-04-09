"use client"
import Image from "next/image"
import avatar from "@/assets/apartment-avatar.jpeg"
import { useRouter } from "next/navigation";
import { Armchair, Bed, CookingPot, Toilet } from "lucide-react";

export default function Apartment({ apartment }: { apartment: any }) {

    const apart = apartment.rooms.reduce((acc: any, { type }: { type: number }) => {
        const map = ["another", "livingroom", "kitchen", "bedroom", "toilet"];
        const key = map[type];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, { livingroom: 0, kitchen: 0, bedroom: 0, toilet: 0, another: 0 })

    const router = useRouter()

    const imageList = apartment.rooms
        .filter((room: any) => room.image?.trim()) // lọc các room có ảnh
        .map((room: any) => room.image)

    return (
        <div onClick={() => router.push(`/guest/rental/${apartment.number}`)} className="rounded-md shadow-lg cursor-pointer overflow-hidden">
            <div className="w-full flex gap-1">
                <div className="w-2/3 relative aspect-[2/1]">
                    <Image
                        fill
                        className="object-cover object-center"
                        src={apartment?.image ? apartment.image : avatar}
                        alt={apartment.number || ""} />
                </div>
                <div className="w-1/3 space-y-1">
                    <div className="w-full relative aspect-[2/1]">
                        <Image
                            fill
                            className="object-cover object-center"
                            src={imageList[0] ? imageList[0] : avatar}
                            alt={apartment.number || ""} />
                    </div>
                    <div className="w-full grid grid-cols-2 gap-1">
                        <div className="relative aspect-square">
                            <Image
                                fill
                                className="object-cover object-center"
                                src={imageList[1] ? imageList[1] : avatar}
                                alt={apartment.number || ""} />
                        </div>
                        <div className="relative aspect-square">
                            <Image
                                fill
                                className="object-cover object-center"
                                src={imageList[2] ? imageList[2] : avatar}
                                alt={apartment.number || ""} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5">
                {apartment.adTitle &&
                    <div className="text-xl font-semibold">
                        {apartment.adTitle}
                    </div>
                }
                <div className="flex items-center gap-5">
                    <div className="flex items-end">
                        {apartment.rentPrice > 0 ? <span className="font-semibold text-lg text-red-500"> {(apartment.rentPrice)} triệu đồng/tháng</span> : <span className="font-semibold">Không đặt rõ mức giá</span>}
                    </div>
                    <div className="font-semibold  text-lg text-red-500 flex items-end">
                        {apartment.acreage} m²
                    </div>
                    <div className="flex gap-3">
                        {apartment.rooms && apartment.rooms.length > 0 &&
                            <>
                                {apart.livingroom && <div className="flex items-center">{apart.livingroom} <Armchair size={20} /></div>}
                                {apart.kitchen && <div className="flex items-center" >{apart.kitchen} <CookingPot size={20} /></div>}
                                {apart.bedroom && <div className="flex items-center">{apart.bedroom} <Bed size={20} /></div>}
                                {apart.toilet && <div className="flex items-center">{apart.toilet} <Toilet size={20} /></div>}
                            </>
                        }
                    </div>
                    <div className="text-sm line-clamp-1 text-neutral-700">
                        XX/YY/ZZ đường A, phường AA, quận AAA, Hà Nội
                    </div>
                </div>
                <div className="flex items-end mt-5 text-neutral-700">
                    {apartment.advertisement ?
                        <>
                            <div className="whitespace-pre-line line-clamp-3">
                                {apartment.advertisement}
                            </div>
                        </>
                        :
                        <>
                            Không có thông tin mô tả
                        </>
                    }
                </div>
            </div>
        </div>
    )
}