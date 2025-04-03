"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetcher, poster } from "@/service/fetch"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { Button } from "@/components/ui/button"

export default function Home() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [apartments, setApartments] = useState<number[]>([])
    const { data } = useSWR("/apartments/ownerless", fetcher)
    const [search, setSearch] = useState(1)
    const { trigger, isMutating } = useSWRMutation("owners", poster)

    const handleAdd = async () => {
        const post = await trigger({
            name,
            phone,
            email,
            apartments
        })
    }

    const handleSelectApartment = (item: number) => {
        if (apartments.includes(item)) {
            setApartments(pre => pre.filter(it => it !== item))
        } else {
            setApartments(pre => [...pre, item])
        }
    }
    return (
        <div className="space-y-3">
            <h5 className="text-center">Tạo mới thông tin chủ hộ</h5>
            <Label>Họ và tên</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Label>Số điện thoại</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Label>Căn hộ</Label>
            <div className="flex flex-wrap gap-3">

                <Select>
                    <SelectTrigger className="w-full md:w-[450px]">
                        {apartments?.length > 0 ? apartments.join(", ") : "Chọn căn hộ"}
                    </SelectTrigger>
                    <SelectContent side="bottom" className="h-[200px]">
                        <Input
                            className="mb-1"
                            type="number"
                            placeholder="Nhập số căn hộ"
                            value={search}
                            onChange={(e) => setSearch(parseInt(e.target.value))}
                        />
                        {data?.map((it: any) => it.number).filter((apartment: any) => apartment.toString().includes(search.toString()))
                            .map((item: any) =>
                                <div key={item}
                                    className={(apartments.includes(item) ? "line-through" : "") + " cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}
                                    onClick={() => handleSelectApartment(item)}>{item}</div>
                            )}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={() => handleAdd()}>Thêm mới</Button>
        </div>
    )
}