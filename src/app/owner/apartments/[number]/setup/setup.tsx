"use client"

import { useState } from "react"

import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import avatar from "@/assets/apartment-avatar.jpeg"
import Room from "./room"
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { Hammer, ListRestart, Plus, RotateCcw, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import _ from "lodash"
import useSWRMutation from "swr/mutation"
import { updater } from "@/service/fetch"
import { useRouter } from "next/navigation"

export default function Setup({ data }: { data: any }) {

    const [title, setTitle] = useState(data.adTitle || "")
    const [price, setPrice] = useState(data.rentPrice || 0)
    const [advertisement, setAdvertisement] = useState(data.advertisement || "")
    const [image, setImage] = useState(data.image || "")
    const [rooms, setRooms] = useState([...data.rooms])

    const { trigger, isMutating } = useSWRMutation(`/apartments/rental-info/${data.number}`, updater)

    const router = useRouter()

    const handleRoomChange = (index: number, field: string, value: any) => {
        const updated = [...rooms]
        updated[index][field] = value
        setRooms([...updated])
    }

    const handleRemoveRoom = (index: number) => {
        setRooms((pre: any) => pre.slice(0, index).concat(pre.slice(index + 1)))
    }

    const handleAddRoom = () => {
        setRooms((pre: any) => [{ type: 0, name: "Chưa đặt tên", image: "", acreage: 0 }, ...pre])
    }

    const handleSubmit = async () => {
        const update = await trigger({
            adTitle: title,
            rentPrice: price,
            advertisement,
            rooms,
            image
        })
        if (update) router.push(`/owner/apartments/${data.number}`)
    }

    const handleResetList = () => {
        setTitle(data.adTitle || "")
        setPrice(data.rentPrice || 0)
        setAdvertisement(data.advertisement || "")
        setImage(data.image || "")
    }

    const handleResetRooms = () => {
        setRooms([...data.rooms])
    }

    const handleResetAll = () => {
        setTitle(data.adTitle || "")
        setPrice(data.rentPrice || 0)
        setAdvertisement(data.advertisement || "")
        setImage(data.image || "")
        setRooms([...data.rooms])
    }

    const handleUpload = (result: CloudinaryUploadWidgetResults) => {
        setImage((pre: string) => ((result?.info as any)?.secure_url || pre))
    }

    return (
        <div className="space-y-6">
            <div className="fixed flex flex-col top-16 right-16 bg-background rounded-full border p-1 z-[5]">
                <Button disabled={isMutating} size={"icon"} title="Lưu thông tin" className="rounded-full" variant={"ghost"} onClick={() => handleSubmit()}>
                    <Save />
                </Button>
                <Button size={"icon"} title="Hoàn tác thông tin tổng quan" className="rounded-full" variant={"ghost"} onClick={() => handleResetList()}>
                    <ListRestart />
                </Button>
                <Button size={"icon"} title="Hoàn tác thông tin phòng" className="rounded-full" variant={"ghost"} onClick={() => handleResetRooms()}>
                    <Hammer />
                </Button>
                <Button size={"icon"} title="Hoàn tác tất cả" className="rounded-full" variant={"ghost"} onClick={() => handleResetAll()}>
                    <RotateCcw />
                </Button>
            </div>
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
                            <div className="text-sm flex whitespace-nowrap items-center border rounded-sm pr-1 focus-within:ring-ring focus-within:ring-1">
                                <Input
                                    className="border-none focus-visible:ring-0 shadow:none px-1"
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
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET_APT}
                    onSuccess={result => handleUpload(result)}
                    onQueuesEnd={(result, { widget }) => {
                        widget.close();
                    }}
                >
                    {({ open }) => {
                        return (
                            <div onClick={() => open()} className="cursor-pointer relative w-full aspect-[16/9]">
                                <div className="w-full h-full absolute bg-gradient-to-b from-white to-black opacity-0 hover:opacity-50 flex z-[1]">
                                    <h6 className="text-white font-medium opacity-100 text-center self-end w-full">
                                        Đổi ảnh đại diện
                                    </h6>
                                </div>
                                <Image
                                    className="object-cover object-center rounded"
                                    fill
                                    src={image || avatar}
                                    alt={data.number || ""} />
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </div>
            <div className="space-y-3">
                <div className="flex gap-3 items-center">
                    <h6 className="font-semibold">Danh sách phòng căn hộ {data.number}</h6>
                    <Button size={"icon"} className="rounded-full" variant={"ghost"} onClick={() => handleAddRoom()}>
                        <Plus />
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rooms.map((room: any, index: number) => (
                        <Room key={index} room={room} index={index}
                            handleRoomChange={handleRoomChange}
                            handleRemoveRoom={handleRemoveRoom} />
                    ))}
                </div>
            </div>
        </div>
    )
}