"use client"

import { fetcher, updater } from "@/service/fetch"
import { useState } from "react"
import useSWR from "swr"
import Noti from "./notification"
import useSWRMutation from "swr/mutation"

export default function Home() {
    const [page, setPage] = useState(1)
    const { data, isLoading, mutate } = useSWR(`/notifications/self?current=${page}`, fetcher)
    const { trigger, isMutating } = useSWRMutation("/notifications/readedall", updater)
    const handleReadAll = async () => {
        if (!isMutating) {
            const update = await trigger({})
            if (update) mutate()
        }
    }
    return (
        <>
            {isLoading === false &&
                <>
                    {data?.results?.length > 0 ?
                        <div className="space-y-3">
                            <div className="flex justify-end">
                                <u onClick={() => handleReadAll()} className="text-sm cursor-pointer">Đánh dấu tất cả là đã đọc</u>
                            </div>
                            {data.results.map((item: any) =>
                                <Noti key={item.id} notification={item} />
                            )}
                        </div>
                        :
                        <h6 className="text-center">
                            Không có thông báo
                        </h6>
                    }
                </>
            }
        </>
    )
}