"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updater } from "@/service/fetch"
import { useState } from "react"
import useSWRMutation from "swr/mutation"

export default function Parameter({
    parameter,
    mutate
}: {
    parameter: any
    mutate: Function
}) {
    const { trigger, isMutating } = useSWRMutation(`/parameters/${parameter.id}`, updater)

    const handleEnter = async () => {
        const update = await trigger({
            value
        })
        if (update) mutate()
    }
    const [value, setValue] = useState(parameter.value || 0)
    return (
        <div className="flex items-center gap-2">
            <Label className="w-1/5">
                {parameter.type === "electric" ? "Điện" : "Nước"}:
            </Label>
            <Input
                type="number"
                min={0}
                value={value}
                onChange={(e) => setValue(Math.floor(Number(e.target.value)))}
            />
            <Button className="w-1/5" onClick={() => handleEnter()} size="sm" variant={"outline"}>{parameter.value !== null ? "Sửa" : "Nhập"}</Button>
        </div>
    )
}