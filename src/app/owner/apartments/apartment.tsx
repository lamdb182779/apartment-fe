
import Link from "next/link"
import avatar from "@/assets/apartment-avatar.jpeg"
import Image from "next/image"

export default function Apartment({ apartment }: { apartment: any }) {

    const apart = apartment.rooms.reduce((acc: any, type: number) => {
        const map = ["another", "livingroom", "kitchen", "bedroom", "toilet"];
        const key = map[type];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, { livingroom: 0, kitchen: 0, bedroom: 0, toilet: 0, another: 0 })

    return (
        <Link href={`/owner/apartments/${apartment.number}`}>
            <div className="rounded-lg border col-span-1 cursor-pointer overflow-hidden group">
                <div className="flex w-[200%]">
                    <div className="w-1/2 -ml-[50%] group-hover:ml-0 transition-all p-5 space-y-3">
                        <div className="grid grid-cols-6 *:flex *:items-center">
                            <div className="font-semibold pl-2 border border-neutral-300 border-r-0 border-b-0">Căn hộ:</div> <div className="border-t border-neutral-300">{apartment.number}</div>
                            <div className="font-semibold pl-2 border border-neutral-300 border-r-0 border-b-0">Tầng:</div> <div className="border-t border-neutral-300">{apartment.floor}</div>
                            <div className="font-semibold pl-2 border border-neutral-300 border-r-0 border-b-0">Trục:</div> <div className="border-t border-r border-neutral-300">{apartment.axis}</div>

                            <div className="font-semibold col-span-2 pl-2 border border-neutral-300 border-r-0 border-b-0">Cần thanh toán:</div> <div className="col-span-2 border-t border-neutral-300">{apartment.debt} đồng</div>
                            <div className="font-semibold pl-2 border border-neutral-300 border-r-0 border-b-0">Diện tích:</div> <div className="border-t border-r border-neutral-300">{apartment.acreage} m²</div>

                            <div className="font-semibold col-span-2 pl-2 border border-neutral-300 border-r-0 border-b-0">Ban công:</div> <div className="border-t border-neutral-300">Có</div>
                            <div className="font-semibold col-span-2 pl-2 border border-neutral-300 border-r-0 border-b-0">Đang bảo trì:</div> <div className="border-t border-r border-neutral-300">Không</div>

                            <div className="font-semibold col-span-2 pl-2 border border-neutral-300 border-r-0">
                                Cư dân:{apartment.residents.map((index: number) => <br key={index} />)}
                            </div>
                            <div className="col-span-4 border border-l-0 border-neutral-300">
                                {apartment.residents?.length > 0 ?
                                    <>
                                        {apartment.residents.map((resident: any) => <>{resident}<br /></>)}
                                    </>
                                    :
                                    <>Không có cư dân</>
                                }
                            </div>
                        </div>
                        <div className="">
                            {apartment.adTitle &&
                                <div className="text-lg font-semibold">
                                    {apartment.adTitle}
                                </div>
                            }
                            <div>
                                {apartment.rentPrice > 0 ? <>Mức giá: <span className="font-semibold text-lg"> {(apartment.rentPrice * 1000000).toLocaleString()} đồng/tháng</span></> : <span className="font-semibold">Không đặt rõ mức giá</span>}
                            </div>
                            <div>
                                {apartment.rooms && apartment.rooms.length > 0 ?
                                    <>
                                        Bao gồm {[apart.livingroom ? `${apart.livingroom} phòng khách` : "",
                                        apart.kitchen ? `${apart.kitchen} phòng bếp` : "",
                                        apart.bedroom ? `${apart.bedroom} phòng ngủ` : "",
                                        apart.toilet ? `${apart.toilet} nhà vệ sinh` : ""].filter(Boolean).join(", ")}
                                        {apart.another ? apart.livingroom + apart.kitchen + apart.bedroom + apart.toilet > 0 ? ` và ${apart.another} phòng khác` : `${apart.another} căn phòng` : ""}
                                    </>
                                    :
                                    <>
                                        Không thấy thông tin chi tiết các phòng
                                    </>
                                }
                            </div>
                            <div>
                                {apartment.advertisement ?
                                    <>
                                        <div className="whitespace-pre-line line-clamp-2">
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
                    <Image
                        className="object-cover object-center rounded-t-lg w-1/2"
                        src={apartment?.image ? apartment.image : avatar}
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