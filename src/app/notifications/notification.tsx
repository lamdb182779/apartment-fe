import { cn } from "@/lib/utils";
import { updater } from "@/service/fetch";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

export default function Noti({ notification }: { notification: any }) {
    const router = useRouter()
    const { trigger, isMutating } = useSWRMutation("/notifications/readed", updater)
    const handleRead = async () => {
        if (!isMutating && !notification.isRead) {
            const update = await trigger({
                id: notification.id
            })
            if (update) {
                router.push(`/notifications/${notification.id}`)
            }
        }
        if (notification.isRead) router.push(`/notifications/${notification.id}`)
    }
    return (
        <div onClick={() => handleRead()}
            className={
                cn("space-y-2 border-b cursor-pointer",
                    { "bg-amber-100 dark:bg-amber-900 hover:bg-amber-200 dark:hover:bg-amber-800": !notification.isRead },
                    { "hover:bg-amber-100 dark:hover:bg-amber-900": notification.isRead }
                )}>
            <h6 className="font-semibold">{notification.title}</h6>
            <div className="line-clamp-3 whitespace-pre-line text-xs">{notification.describe}</div>
            <i className="text-xs opacity-70">{format(notification.createdAt, "dd/MM/yyyy")}</i>
        </div>
    )
}