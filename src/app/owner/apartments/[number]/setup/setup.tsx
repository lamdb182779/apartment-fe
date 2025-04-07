"use client"

import { useState } from "react"

import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import avatar from "@/assets/apartment-avatar.jpeg"

export default function Setup({ data }: { data: any }) {

    const [title, setTitle] = useState(data.adTitle)
    const [price, setPrice] = useState(data.rentPrice)
    const [advertisement, setAdvertisement] = useState(data.advertisement)
    const [rooms, setRooms] = useState(data.rooms)

    const handleRoomChange = (index: number, field: string, value: any) => {
        const updated = [...rooms]
        updated[index][field] = value
        setRooms(updated)
    }

    const handleSubmit = () => {
        // Gọi API cập nhật
        console.log({ title, price, advertisement, rooms })
        // updateApartment(...)
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <Label className="font-medium">Tiêu đề</Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="font-medium">Mức giá</Label>
                            <div className="text-sm flex gap-2 whitespace-nowrap items-center">
                                <Input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                /> triệu đồng/tháng
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label className="font-medium">Mô tả</Label>
                        <Textarea
                            value={advertisement}
                            onChange={(e) => setAdvertisement(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
                <div>
                    <Image
                        className="object-cover object-center rounded"
                        src={data?.image ? data.image : avatar}
                        alt={data.number || ""} />
                </div>

            </div>

            <div>
                <h5 className="font-semibold mb-2">Danh sách phòng</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rooms.map((room: any, index: number) => (
                        <div key={room.id} className="p-4 border rounded space-y-2">
                            <Input
                                value={room.name}
                                onChange={(e) => handleRoomChange(index, "name", e.target.value)}
                            />
                            <Input
                                type="number"
                                value={room.acreage}
                                onChange={(e) => handleRoomChange(index, "acreage", Number(e.target.value))}
                            />
                            <div className="relative w-full aspect-[16/9] bg-gray-100 rounded overflow-hidden">
                                <Image
                                    src={room.image}
                                    alt={room.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        handleRoomChange(index, "image", URL.createObjectURL(file))
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
                Lưu thay đổi
            </button>
        </div>
    )
}