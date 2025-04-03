"use client"

import { Label } from "@/components/ui/label"
import { fetcher } from "@/service/fetch";
import useSWR from "swr"

import { Bar, BarChart, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Room from "./room";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Apartment({ data }: { data: any }) {

    const chartConfigElectric = {
        value: {
            label: "Điện",
            color: "#ffd700",
        },
    } satisfies ChartConfig
    const chartConfigWater = {
        value: {
            label: "Nước",
            color: "#2563eb",
        },
    } satisfies ChartConfig

    return (
        <div className="space-y-5 ">
            <div className="space-y-2">
                <Label className="font-semibold">
                    Phòng {data.number}
                </Label>
                <div className="grid grid-cols-3">
                    <div>
                        Tầng
                    </div>
                    <div className="col-span-2">
                        {data.floor}
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Trục
                    </div>
                    <div className="col-span-2">
                        {data.axis}
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Diện tích
                    </div>
                    <div className="col-span-2">
                        {data.acreage}
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Cư dân
                    </div>
                    <div className="col-span-2">
                        {data.tenants?.length > 0 ?
                            <>
                                {data.tenants.map((tenant: any) => <>{tenant}<br /></>)}
                            </>
                            :
                            <>Không có cư dân</>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Ban công
                    </div>
                    <div className="col-span-2">
                        {data.hasBalcony ? "Có" : "Không"}
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Đang bảo trì
                    </div>
                    <div className="col-span-2">
                        {data.isMaintaining ? "Có" : "Không"}
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div>
                        Thanh toán
                    </div>
                    <div className="col-span-2">
                        {data.debt} đồng
                    </div>
                </div>
            </div>
            <Accordion type="multiple">
                {data.rooms ?
                    <>
                        <AccordionItem value="rooms">
                            <AccordionTrigger className="font-semibold">
                                Danh sách các phòng
                            </AccordionTrigger>
                            <AccordionContent className="gap-5 grid md:grid-cols-2">
                                {data.rooms.map((room: any) =>
                                    <Room key={room.id} room={room} />
                                )}
                                <div className="col-span-full md:w-[450px]">
                                    Không gian khác: {data.acreage - data.rooms.reduce((sum: number, room: any) => sum + parseFloat(room.acreage), 0)}m&#178;
                                </div>

                            </AccordionContent>
                        </AccordionItem>
                    </>
                    :
                    <>
                        Không thấy thông tin chi tiết các phòng
                    </>
                }
                <AccordionItem value={"parameters"}>
                    <AccordionTrigger className="font-semibold">
                        Thống kê điện nước
                    </AccordionTrigger>
                    <AccordionContent>
                        <Label>Thống kê chỉ số điện</Label>
                        <ChartContainer config={chartConfigElectric} className="min-h-[200px] w-full md:w-[450px]">
                            <BarChart accessibilityLayer data={data.parameters.electric}>
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 7)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                        <Label >Thống kê chỉ số nước</Label>
                        <ChartContainer config={chartConfigWater} className="min-h-[200px] w-full md:w-[450px]">
                            <BarChart accessibilityLayer data={data.parameters.water}>
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 7)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}