"use client"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { fetcher, updater } from "@/service/fetch"
import { startOfDay } from "date-fns"
import { useState } from "react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"

export default function Service({ service, numbers }: { service: any, numbers: number[] }) {
    const { data, mutate } = useSWR(`/services/${service.id}`, fetcher)

    const { trigger, isMutating } = useSWRMutation(`/services/${service.id}`, updater)
    const { trigger: status, isMutating: isStatusing } = useSWRMutation(`/services/status`, updater)
    const [type, setType] = useState(service.type)
    const [number, setNumber] = useState<number>(service.apartment.number)
    const [other, setOther] = useState("")
    const [startDate, setStartDate] = useState(startOfDay(new Date(service.startDate)))
    const [endDate, setEndDate] = useState(startOfDay(new Date(service.endDate)))
    const [area, setArea] = useState(service.area)
    const [ot, setOt] = useState("")
    const [reason, setReason] = useState(service.reason)
    const handleUpdate = async () => {
        const update = await trigger({
            type: type === "other" ? other : type,
            startDate,
            endDate,
            area: area === "other" ? ot : area,
            reason,
            number
        })
        if (update) mutate()
    }
    const handleStatus = async () => {
        const ccl = await status({
            id: service.id,
            status: data.status !== "Đã hủy" ? "Đã hủy" : "Chờ xác nhận"
        })
        if (ccl) mutate()
    }
    return (
        <div className="space-y-3 relative">
            <h6 className="text-center font-semibold">Chỉnh sửa yêu cầu</h6>
            <div>
                <Label>Căn hộ</Label>
                <div className="flex items-center gap-3">
                    <Select value={`${number}`} onValueChange={value => setNumber(Number(value))}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Chọn căn hộ" />
                        </SelectTrigger>
                        <SelectContent>
                            {numbers.map(number =>
                                <SelectItem value={`${number}`}>{number}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label>Loại yêu cầu</Label>
                <div className="flex items-center gap-3">
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Chọn loại yêu cầu" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Vận chuyển đồ">Vận chuyển đồ</SelectItem>
                            <SelectItem value="Sửa chữa">Sửa chữa</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                    </Select>
                    {type === "other" &&
                        <Input value={other} onChange={e => setOther(e.target.value)} />}
                </div>
            </div>
            <div>
                <Label>Thời gian bắt đầu</Label>
                <div>
                    <DatePicker date={startDate} setDate={setStartDate as any} />
                </div>
            </div>
            <div>
                <Label>Thời gian kết thúc</Label>
                <div>
                    <DatePicker date={endDate} setDate={setEndDate as any} />
                </div>
            </div>
            <div>
                <Label>Khu vực sử dụng</Label>
                <div className="flex items-center gap-3">
                    <Select value={area} onValueChange={setArea}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Chọn khu vực" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Thang máy">Thang máy</SelectItem>
                            <SelectItem value="Hành lang">Hành lang</SelectItem>
                            <SelectItem value="Không">Không</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                        {area === "other" &&
                            <Input value={ot} onChange={e => setOt(e.target.value)} />}
                    </Select>
                </div>
            </div>
            <div>
                <Label>Mô tả cụ thể</Label>
                <Textarea value={reason} onChange={e => setReason(e.target.value)} />
            </div>
            <div className="flex justify-center w-full gap-5">
                <Button onClick={() => handleUpdate()} disabled={isMutating}>Sửa yêu cầu</Button>
                {data?.status !== "Đã hủy" ?
                    <Button onClick={() => handleStatus()} disabled={isStatusing} variant={"destructive"}>Huỷ yêu cầu</Button>
                    :
                    <Button onClick={() => handleStatus()} disabled={isStatusing} variant={"outline"}>Khôi phục yêu cầu</Button>
                }
            </div>
            <div className="absolute italic top-8 right-0 text-xs">{data?.status}</div>
        </div>
    )
}