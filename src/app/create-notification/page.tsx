import { axiosInstance } from "@/service/fetch"
import NewNoti from "./new-noti"

export default async function Home() {
    const apartments = await axiosInstance.get("apartments/allnumber").then(res => res.data).catch(error => { })

    if (!apartments) return (<>Không thể lấy danh sách căn hộ</>)
    return (
        <div className="space-y-5">
            <NewNoti apartments={apartments} />
        </div>
    )
}