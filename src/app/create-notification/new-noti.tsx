"use client"

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlateEditor } from "@/components/plate-editor";
import useSWRMutation from "swr/mutation";
import { poster } from "@/service/fetch";
import { Plus } from "lucide-react";


export default function NewNoti({ apartments }: { apartments: number[] }) {
    const floors = Array.from({ length: 20 }, (_, i) => i + 1)
    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState("");
    const [selector, setSelector] = useState("all");
    const [numbers, setNumbers] = useState(apartments)
    const plateRef = useRef(null)
    const [floorsList, setFloorsList] = useState([1])
    const [apartmentsList, setApartmentsList] = useState([101])
    const [search, setSearch] = useState(1)

    const { trigger, isMutating } = useSWRMutation("/notifications", poster)

    const handleSelector = (value: string) => {
        setSelector(value)
        switch (value) {
            case "all": {
                setNumbers(apartments)
                break
            }
            case "floor": {
                setNumbers(apartments.filter(apartment => floorsList.includes(Math.floor(apartment / 100))))
                break
            }
            case "apartment": {
                setNumbers(apartments.filter(apartment => apartmentsList.includes(apartment)))
                break
            }
            default: break
        }
    }

    useEffect(() => {
        if (selector === "floor") {
            setNumbers(apartments.filter(apartment => floorsList.includes(Math.floor(apartment / 100))))
        }
    }, [floorsList])

    useEffect(() => {
        if (selector === "apartment") {
            setNumbers(apartments.filter(apartment => apartmentsList.includes(apartment)))
        }
    }, [apartmentsList])

    const handleSelectFloor = (item: number) => {
        if (floorsList.includes(item)) {
            setFloorsList(pre => pre.filter(it => it !== item))
        } else {
            setFloorsList(pre => [...pre, item])
        }
    }

    const handleSelectApartment = (item: number) => {
        if (apartmentsList.includes(item)) {
            setApartmentsList(pre => pre.filter(it => it !== item))
        } else {
            setApartmentsList(pre => [...pre, item])
        }
    }

    const handleCreate = async () => {
        const content = (plateRef?.current as any)?.children

        if (content.length > 1 || (content.length === 1 && content[0]?.children.some((item: any) => item.text !== "null"))) {
            const poster = await trigger({
                title,
                describe,
                content,
                apartments: numbers,
            })
        }

    }
    return (
        <>
            <Button disabled={isMutating} onClick={() => handleCreate()} size={"icon"} className="rounded-full top-[6.5rem] left-[95vw] sticky z-[70]">
                <Plus />
            </Button>
            <h5 className="font-semibold text-center">Thông báo mới</h5>
            <div>
                <Label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</Label>
                <Input
                    id="title"
                    placeholder="Nhập tiêu đề"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-md"
                />
            </div>

            <div>
                <Label htmlFor="describe" className="block text-sm font-medium ">Mô tả</Label>
                <Textarea
                    id="describe"
                    placeholder="Nhập mô tả"
                    value={describe}
                    onChange={(e) => setDescribe(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-md"
                />
            </div>

            <div>
                <Label htmlFor="selector" className="block text-sm font-medium ">Chọn căn hộ</Label>
                <div className="flex items-center flex-wrap gap-3">
                    <Select
                        value={selector}
                        onValueChange={value => handleSelector(value)}
                    >
                        <SelectTrigger className="w-full md:w-[450px]">
                            <SelectValue placeholder="Chọn đối tượng" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="floor">Tầng</SelectItem>
                            <SelectItem value="apartment">Căn hộ</SelectItem>
                        </SelectContent>
                    </Select>
                    {selector === "floor" &&
                        <Select>
                            <SelectTrigger className="w-full md:w-[450px]">
                                {floorsList?.length > 0 ? floorsList.join(", ") : "Chọn tầng"}
                            </SelectTrigger>
                            <SelectContent side="bottom" className="h-[200px]">
                                {floors.map(item =>
                                    <div key={item}
                                        className={(floorsList.includes(item) ? "line-through" : "") + " cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}
                                        onClick={() => handleSelectFloor(item)}>{item}</div>
                                )}
                            </SelectContent>
                        </Select>
                    }
                    {selector === "apartment" &&
                        <Select>
                            <SelectTrigger className="w-full md:w-[450px]">
                                {apartmentsList?.length > 0 ? apartmentsList.join(", ") : "Chọn căn hộ"}
                            </SelectTrigger>
                            <SelectContent side="bottom" className="h-[200px]">
                                <Input
                                    className="mb-1"
                                    type="number"
                                    placeholder="Nhập số căn hộ"
                                    value={search}
                                    onChange={(e) => setSearch(parseInt(e.target.value))}
                                />
                                {apartments.filter(apartment => apartment.toString().includes(search.toString()))
                                    .map(item =>
                                        <div key={item}
                                            className={(apartmentsList.includes(item) ? "line-through" : "") + " cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}
                                            onClick={() => handleSelectApartment(item)}>{item}</div>
                                    )}
                            </SelectContent>
                        </Select>
                    }
                </div>
            </div>
            <div className="shadow shadow-foreground rounded-xl">
                <PlateEditor ref={plateRef} />
            </div>
            <div />
        </>
    )
}