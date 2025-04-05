"use client"

import { Label } from "@/components/ui/label"
import apart from "@/assets/apartment-avatar.jpeg"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Room from "./room";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image"

export default function Apartment({ data }: { data: any }) {


    // const chartConfigElectric = {
    //     value: {
    //         label: "Điện",
    //         color: "#ffd700",
    //     },
    // } satisfies ChartConfig
    // const chartConfigWater = {
    //     value: {
    //         label: "Nước",
    //         color: "#2563eb",
    //     },
    // } satisfies ChartConfig
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
                    {/* <Image
                        className="object-cover object-center rounded"
                        src={data?.image ? data.image : apart}
                        alt={data.number || ""} /> */}
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
                            <YAxis yAxisId="left" orientation="left" />

                            {/* Trục Y bên phải cho nước */}
                            <YAxis yAxisId="right" orientation="right" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar yAxisId="left" dataKey="electric" fill="#ffd700" name="Điện" radius={4} />
                            <Bar yAxisId="right" dataKey="water" fill="#2563eb" name="Nước" radius={4} />
                        </BarChart>
                    </ChartContainer>
                    <div className="text-sm font-semibold w-full text-center">Biểu đồ tiêu thụ điện & nước</div>
                </div>
            </div>
            {data.rooms ?
                <>
                </>
                :
                <>
                    Không thấy thông tin chi tiết các phòng
                </>
            }
        </div>
    )
}