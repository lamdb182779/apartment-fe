"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import avatar from "@/assets/apartment-avatar.jpeg"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"



export default function Room({
    room,
    handleRoomChange,
    index,
    handleRemoveRoom
}: {
    room: any,
    handleRoomChange: Function,
    index: number,
    handleRemoveRoom: Function
}) {

    const handleUpload = (result: CloudinaryUploadWidgetResults) => {
        if ((result?.info as any)?.secure_url) {
            handleRoomChange(index, "image", (result?.info as any)?.secure_url)
        }
    }

    const types = [
        {
            value: 1,
            name: "Phòng khách"
        },
        {
            value: 2,
            name: "Phòng bếp"
        },
        {
            value: 3,
            name: "Phòng ngủ"
        },
        {
            value: 4,
            name: "Nhà vệ sinh"
        },
        {
            value: 0,
            name: "Khác"
        },
    ]
    return (
        <div key={room.id} className="p-4 border rounded space-y-2">
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-3">
                    <Input
                        value={room.name}
                        onChange={(e) => handleRoomChange(index, "name", e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <Select value={room.type.toString()} onValueChange={(value) => handleRoomChange(index, "type", parseInt(value))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn loại phòng" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {types.map(item =>
                                    <SelectItem value={item.value.toString()}>{item.name}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm flex whitespace-nowrap items-center border rounded-sm pr-1 focus-within:ring-ring focus-within:ring-1">
                    <Input
                        className="border-none focus-visible:ring-0 shadow:none px-1"
                        type="number"
                        value={room.acreage}
                        onChange={(e) => handleRoomChange(index, "acreage", Number(e.target.value))}
                    /> m²
                </div>
            </div>
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET_ROOM}
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
                                    Đổi ảnh phòng
                                </h6>
                            </div>
                            <Image
                                className="object-cover object-center rounded"
                                fill
                                src={room.image || avatar}
                                alt={room.name || ""} />
                        </div>
                    );
                }}
            </CldUploadWidget>
            <AlertDialog>
                <AlertDialogTrigger className="w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
                    Xóa phòng
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Bạn có chắc muốn thực hiện hành động này không?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Lưu ý rằng thông tin phòng này sẽ bị xóa nếu trước đó chưa lưu lại thông tin căn hộ.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Từ bỏ</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500" onClick={() => handleRemoveRoom(index)}>Tiếp tục</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}