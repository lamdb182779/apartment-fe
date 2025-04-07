"use client"

import { Label } from "@/components/ui/label"
import avatar from "@/assets/apartment-avatar.jpeg"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { updater } from "@/service/fetch"
import useSWRMutation from "swr/mutation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Settings } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Apartment({ data }: { data: any }) {

    const { trigger, isMutating } = useSWRMutation(`/apartments/change-tenant-looking/${data.number}`, updater)
    const [tenantLooking, setTenantLooking] = useState(data.tenantLooking || false)

    const router = useRouter()

    const handleChange = async () => {
        const update = await trigger({})
        if (update) {
            setTenantLooking((pre: boolean) => !pre)
        }
    }


    const chartConfigCombined = {
        electric: {
            label: "Điện",
            color: "#ffd700",
        },
        water: {
            label: "Nước",
            color: "#2563eb",
        },
    } satisfies ChartConfig

    const combinedData = data.parameters.electric.map((eItem: any, index: number) => ({
        month: eItem.month,
        electric: eItem.value,
        water: data.parameters.water[index]?.value ?? 0,
    }))
    const maxElectric = Math.max(...combinedData.map((d: any) => d.electric));
    const maxWater = Math.max(...combinedData.map((d: any) => d.water));

    const maxYLeft = Math.ceil(maxElectric / 100) * 100 + 100
    const maxYRight = Math.ceil(maxWater / 10) * 10 + 10

    const apart = data.rooms.reduce((acc: any, { type }: { type: number }) => {
        const map = ["another", "livingroom", "kitchen", "bedroom", "toilet"];
        const key = map[type];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, { livingroom: 0, kitchen: 0, bedroom: 0, toilet: 0, another: 0 })

    return (
        <div className="space-y-5 ">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 grid grid-cols-6 *:flex *:items-center">
                    <div className="font-semibold pl-2 border border-neutral-300 border-r-0 border-b-0">Căn hộ:</div> <div className="border-t border-neutral-300">{data.number}</div>
                    <div className="font-semibold pl-2 border border-neutral-300 border-r-0 border-b-0">Tầng:</div> <div className="border-t border-neutral-300">{data.floor}</div>
                    <div className="font-semibold pl-2 border border-neutral-300 border-r-0 border-b-0">Trục:</div> <div className="border-t border-r border-neutral-300">{data.axis}</div>

                    <div className="font-semibold col-span-2 pl-2 border border-neutral-300 border-r-0 border-b-0">Cần thanh toán:</div> <div className="col-span-2 border-t border-neutral-300">{data.debt} đồng</div>
                    <div className="font-semibold pl-2 border border-neutral-300 border-r-0 border-b-0">Diện tích:</div> <div className="border-t border-r border-neutral-300">{data.acreage} m²</div>

                    <div className="font-semibold col-span-2 pl-2 border border-neutral-300 border-r-0 border-b-0">Ban công:</div> <div className="border-t border-neutral-300">Có</div>
                    <div className="font-semibold col-span-2 pl-2 border border-neutral-300 border-r-0 border-b-0">Đang bảo trì:</div> <div className="border-t border-r border-neutral-300">Không</div>

                    <div className="font-semibold col-span-2 pl-2 border border-neutral-300 border-r-0">
                        Cư dân:{data.residents.map(() => <br />)}
                    </div>
                    <div className="col-span-4 border border-l-0 border-neutral-300">
                        {data.residents?.length > 0 ?
                            <>
                                {data.residents.map((resident: any) => <>{resident}<br /></>)}
                            </>
                            :
                            <>Không có cư dân</>
                        }
                    </div>

                    {data?.advertisement &&
                        <div className="col-span-4">
                            <Textarea disabled className="border-none shadow-none" value={data.advertisement} />

                        </div>}
                </div>
                <div className="col-span-1">
                    <ChartContainer config={chartConfigCombined} className="min-h-[300px] w-full">
                        <BarChart accessibilityLayer data={combinedData}>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 7)}
                            />

                            {/* Trục Y bên trái cho điện */}
                            <YAxis yAxisId="left" orientation="left" domain={[0, maxYLeft]} />

                            {/* Trục Y bên phải cho nước */}
                            <YAxis yAxisId="right" orientation="right" domain={[0, maxYRight]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar yAxisId="left" dataKey="electric" fill="#FFEA00" name="Điện" radius={4} >
                                <LabelList
                                    dataKey="electric"
                                    position="top"
                                    content={({ x, y }) => (
                                        <text
                                            x={x}
                                            y={y ? y as number - 6 : 0}
                                            fill="#000"
                                            textAnchor="right"
                                            fontSize={12}
                                            fontWeight="bold"
                                        >
                                            Điện
                                        </text>
                                    )}
                                />
                            </Bar>
                            <Bar yAxisId="right" dataKey="water" fill="#4FD1C5" name="Nước" radius={4} >
                                <LabelList
                                    dataKey="electric"
                                    position="top"
                                    content={({ x, y }) => (
                                        <text
                                            x={x}
                                            y={y ? y as number - 6 : 0}
                                            fill="#000"
                                            textAnchor="right"
                                            fontSize={12}
                                            fontWeight="bold"
                                        >
                                            Nước
                                        </text>
                                    )}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                    <div className="text-sm font-semibold w-full text-center">Biểu đồ tiêu thụ điện & nước</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <Image
                        className="object-cover object-center rounded"
                        src={data?.image ? data.image : avatar}
                        alt={data.number || ""} />
                </div>
                <div className="grid p-5">
                    <div>
                        <div className="flex items-center space-x-5">
                            {tenantLooking ?
                                <Button disabled={isMutating} onClick={() => handleChange()} size={"sm"} variant={"destructive"}>
                                    Tắt tìm người thuê
                                </Button>
                                :
                                <Button disabled={isMutating} onClick={() => handleChange()} size={"sm"}>
                                    Tìm người thuê
                                </Button>
                            }
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="rounded-full" onClick={() => router.push(`/owner/apartments/${data.number}/setup`)}>
                                        <Settings />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-background text-foreground shadow">
                                        Cài đặt thông tin căn hộ
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className="text-sm">
                        XX/YY/ZZ đường A, phường AA, quận AAA, Hà Nội
                    </div>
                    {data.adTitle &&
                        <div className="text-lg font-semibold">
                            {data.adTitle}
                        </div>
                    }
                    <div>
                        {data.rentPrice ? <>Mức giá: <span className="font-semibold"> `${data.rentPrice * 1000000} đồng/tháng`</span></> : <span className="text-sm font-semibold">Không đặt rõ mức giá</span>}
                    </div>
                    <div>
                        {data.rooms && data.rooms.length > 0 ?
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
                        {data.advertisement ?
                            <></>
                            :
                            <>
                                Không có thông tin mô tả
                            </>
                        }
                    </div>
                </div>
                {data.rooms && data.rooms.length > 0 &&
                    < div className="col-span-2">
                        <Carousel>
                            <CarouselContent className="">
                                {data.rooms.map((room: any) =>
                                    <CarouselItem key={room.id} className="basis-1/5 text-sm text-center">
                                        <div className="w-full relative aspect-[16/9] mb-1">
                                            <Image
                                                fill
                                                className="object-cover object-center rounded"
                                                src={room.image ? room.image : avatar}
                                                alt={room.name || ""} />
                                        </div>
                                        {room.name} ({room.acreage}m&#178;)
                                    </CarouselItem>
                                )
                                }
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                }
            </div>
        </div >
    )
}