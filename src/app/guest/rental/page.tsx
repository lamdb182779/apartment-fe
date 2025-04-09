import { axiosInstance } from "@/service/fetch"
import Apartments from "./apartments"

export default async function Home() {
    const data = await axiosInstance.get("/apartments/tenant-looking").then(res => res.data).catch(error => { })

    return (
        <div className="space-y-2">
            <Apartments data={data} />
        </div>
    )
}