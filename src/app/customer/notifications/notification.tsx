import { updater } from "@/service/fetch";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

export default function Noti({ notification, mutate }: { notification: any, mutate: Function }) {
    const router = useRouter()
    const { trigger, isMutating } = useSWRMutation("/notifications/readed", updater)

    const handleRead = async () => {
        if (!isMutating && !notification.isRead) {
            const update = await trigger({
                id: notification.id
            })
            if (update) mutate()
        }
    }
    return (
        <div onClick={() => handleRead()}
            className={`space-y-2 p-2 rounded cursor-pointer hover:bg-neutral-200 ${notification.isRead && "opacity-70"}`}>
            <h6 className="font-semibold">{notification.title}</h6>
            <div className="line-clamp-2 whitespace-pre-line text-xs">{notification.describe}</div>
            <i className="text-xs text-neutral-700">{format(notification.createdAt, "dd/MM/yyyy")}</i>
        </div>
    )
}