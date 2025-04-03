"use client"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { poster } from "@/service/fetch"
import { startOfDay } from "date-fns"
import { useState } from "react"
import useSWRMutation from "swr/mutation"


export default function NewService({ numbers }: { numbers: number[] }) {
    const { trigger, isMutating } = useSWRMutation("/services", poster)
    const [type, setType] = useState("Vận chuyển đồ")
    const [number, setNumber] = useState<number>()
    const [other, setOther] = useState("")
    const [startDate, setStartDate] = useState(startOfDay(new Date()))
    const [endDate, setEndDate] = useState(startOfDay(new Date()))
    const [area, setArea] = useState("Thang máy")
    const [ot, setOt] = useState("")
    const [reason, setReason] = useState("")
    const handleNew = async () => {
        const poster = await trigger({
            type: type === "other" ? other : type,
            startDate,
            endDate,
            area: area === "other" ? ot : area,
            reason,
            number
        })
    }
    return (
        <div className="space-y-3">
            <h6 className="text-center font-semibold">Tạo mới yêu cầu</h6>
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
            <div className="flex justify-center w-full">
                <Button onClick={() => handleNew()} disabled={isMutating}>Gửi yêu cầu</Button>
            </div>
        </div>
    )
}