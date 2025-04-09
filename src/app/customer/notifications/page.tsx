"use client"

import { fetcher, updater } from "@/service/fetch"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Noti from "./notification"
import useSWRMutation from "swr/mutation"
import Detail from "./detail"

export default function Home() {
    const [page, setPage] = useState(1)
    const { data, isLoading, mutate } = useSWR(`/notifications/self?current=${page}`, fetcher)
    const [notification, setNotification] = useState()
    useEffect(() => {
        if (!notification && data?.results?.length > 0) {
            setNotification(data.results[0])
        }
    }, [data])
    const { trigger, isMutating } = useSWRMutation("/notifications/readedall", updater)
    const handleReadAll = async () => {
        if (!isMutating) {
            const update = await trigger({})
            if (update) mutate()
        }
    }
    return (
        <div className="flex">
            {isLoading === false &&
                <>
                    <div className="w-[20vw] pt-20 fixed top-0 -ml-16 border-r-neutral-300 border-r h-screen">
                        {data?.results?.length > 0 ?
                            <div className="space-y-5">
                                <div className="flex justify-end pr-3">
                                    <u onClick={() => handleReadAll()} className="text-sm cursor-pointer">Đánh dấu tất cả là đã đọc</u>
                                </div>
                                <div className="px-3">
                                    {data.results.map((item: any) =>
                                        <div onClick={() => setNotification(item)}>
                                            <Noti key={item.id} notification={item} mutate={mutate} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            :
                            <h6 className="text-center text-sm">
                                Hiện không có thông báo nào
                            </h6>
                        }
                    </div>
                    <div className="grow pl-[20vw] flex justify-center">
                        <Detail notification={notification} />
                    </div>
                </>
            }
        </div>
    )
}