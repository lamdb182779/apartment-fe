import { axiosInstance } from "@/service/fetch"
import Notification from "./notification"

export default async function Home({ params }: { params: { id: string } }) {
    const notification = await axiosInstance.get(`/notifications/${params.id}`).then(res => res.data).catch(error => { })
    if (!notification) return (<>Không thấy thông báo này</>)
    return (
        <div className="space-y-5">
            <Notification notification={notification} />
        </div>
    )
}