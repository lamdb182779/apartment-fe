
import Link from "next/link"
import apart from "@/assets/apartment-avatar.jpeg"
import Image from "next/image"

export default function Apartment({ apartment }: { apartment: any }) {

    return (
        <Link href={`/owner/apartments/${apartment.number}`}>
            <div className="rounded-lg border col-span-1 cursor-pointer overflow-hidden group">
                <div className="flex w-[200%]">
                    <div className="w-1/2 -ml-[50%] group-hover:ml-0 transition-all">

                    </div>
                    <Image
                        className="object-cover object-center rounded-t-lg w-1/2"
                        src={apartment?.image ? apartment.image : apart}
                        alt={apartment.number || ""} />
                </div>
                <div className="p-5 text-sm flex space-x-3 items-center">
                    <div className="font-semibold">Căn hộ {apartment.number}</div>
                    {apartment.residents?.length > 0 ?
                        <span className="text-xs border rounded-sm px-1 py-[2.5px] text-green-500 border-green-500">Có {apartment.residents.length} cư dân</span>
                        :
                        <span className="text-xs border rounded-sm px-1 py-[2.5px] text-neutral-500 border-neutral-500">Không có cư dân</span>
                    }
                    {apartment.tenantLooking ?
                        <span className="text-xs border rounded-sm px-1 py-[2.5px] text-yellow-500 border-yellow-500">Đang tìm người thuê</span>
                        :
                        <span className="text-xs border rounded-sm px-1 py-[2.5px] text-neutral-500 border-neutral-500">Không tìm người thuê</span>
                    }
                    {apartment.maintaining &&
                        <span className="text-xs border rounded-sm px-1 py-[2.5px] text-red-500 border-red-500">Đang sửa chữa</span>
                        // :
                        // <span className="text-xs border rounded-sm px-1 py-[2.5px] text-neutral-500 border-neutral-500">Không tìm người thuê</span>
                    }
                </div>
            </div>
        </Link>
    )
}