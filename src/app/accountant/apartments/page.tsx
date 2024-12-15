"use client"

import { Label } from "@radix-ui/react-dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import MonthPicker from "@/components/month-picker";
import { isBefore, startOfMonth, subMonths, setDate, format } from "date-fns";
import useSWR from "swr";
import { fetcher } from "@/service/fetch";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function Home() {
    const floors = Array.from({ length: 20 }, (_, i) => i + 1)
    const [floor, setFloor] = useState(1)
    const [month, setMonth] = useState(subMonths(startOfMonth(new Date()), 1))
    const { data, isLoading, mutate } = useSWR(`/bills?month=${format(month, "MM/yyyy")}&floor=${floor}`, fetcher)

    return (
        <div className="space-y-2">
            <Label className="font-semibold text-center">
                Danh sách căn hộ
            </Label>
            <div className="space-y-2 gap-4 md:grid md:grid-cols-2 lg:flex lg:items-center">
                <div className="lg:w-[100px]">
                    <Select value={floor.toString()} onValueChange={(value) => setFloor(parseInt(value))}>
                        <SelectTrigger id="floor" className="mt-1">
                            <SelectValue placeholder="Chọn tầng" />
                        </SelectTrigger>
                        <SelectContent>
                            {floors.map(floor =>
                                <SelectItem key={floor} value={floor.toString()}>Tầng {floor}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <MonthPicker
                    date={month}
                    setDate={setMonth}
                />
            </div>
            {!isLoading &&
                <>
                    {data?.length > 0 ?
                        <>
                            {data.map((apartment: any) =>
                                <Accordion key={apartment[0].number} type="single" collapsible>
                                    <AccordionItem value={apartment[0].number}>
                                        <AccordionTrigger>
                                            <div className="space-x-2">
                                                <span>
                                                    Căn hộ {apartment[0].number}
                                                </span>
                                                {apartment.map((parameter: any) =>
                                                    <span className={`p-1 border rounded ${parameter.value !== null ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}>
                                                        {parameter.type === "electric" ? "Điện" : "Nước"}
                                                    </span>
                                                )}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-2">
                                            {apartment.map((parameter: any) => <></>
                                                // <Parameter key={parameter.id} parameter={parameter} mutate={mutate} />
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            )}
                        </>
                        :
                        <>Không có dữ liệu</>
                    }
                </>}
        </div>
    )
}