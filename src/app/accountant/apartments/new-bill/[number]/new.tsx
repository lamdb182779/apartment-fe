"use client"

import { PlateEditor } from "@/components/plate-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast"
import { poster } from "@/service/fetch"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react"
import useSWRMutation from "swr/mutation"

export default function NewBill({
    number,
    initial,
    curAmount,
    tit,
    tp,
    id,
}: {
    number: number
    initial?: any
    curAmount?: number
    tit?: string
    tp?: string
    id: string
}) {
    const plateRef = useRef(null)
    const router = useRouter()
    const [amount, setAmount] = useState(curAmount || 0)
    const [title, setTitle] = useState(tit)
    const [type, setType] = useState(tp || "Dịch vụ khác")
    const { trigger, isMutating } = useSWRMutation("/bills", poster)
    const handleCreate = async () => {
        const content = (plateRef?.current as any)?.children

        if (content.length > 1 || (content.length === 1 && content[0]?.children.some((item: any) => item.text !== "null"))) {
            const post = await trigger({
                amount,
                title,
                id,
                type,
                content,
                number: Math.floor(number),
            })
            if (post) {
                router.push("/accountant/apartments")
            }
        } else {
            toast({
                description: "Nội dung hóa đơn không đúng định dạng!",
                variant: "destructive"
            })
        }
    }
    return (
        <div className="space-y-5 relative">
            <Button disabled={isMutating} onClick={() => handleCreate()} size={"icon"} className="rounded-full top-[6.5rem] left-[90vw] sticky z-[70]">
                <Plus />
            </Button>
            <div className="text-lg">Hóa đơn đến căn hộ {number}</div>
            <h3 className="font-semibold text-center">Thông tin hóa đơn</h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex items-center ">
                    <div className="w-[150px]">Tiêu đề:</div>
                    <Input value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="flex items-center">
                    <div className="w-[150px]">Tổng thu lần này:</div>
                    <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
                </div>
                <div className="flex items-center">
                    <div className="w-[150px]">Loại hóa đơn:</div>
                    <Select value={type} onValueChange={(value) => setType(value)}>
                        <SelectTrigger id="floor" className="mt-1">
                            <SelectValue placeholder="Chọn tầng" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"Dịch vụ khác"}>Dịch vụ khác</SelectItem>
                            <SelectItem value={"Dịch vụ điện nước"}>Dịch vụ điện nước</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center">
                    <div className="w-[150px]">Mã hóa đơn:</div>
                    <Input value={id} disabled />
                </div>
            </div>
            <div className="shadow shadow-foreground rounded-xl">
                <PlateEditor ref={plateRef} content={initial} />
            </div>
            <div></div>
        </div>
    )
}   