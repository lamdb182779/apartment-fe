import { axiosInstance } from "@/service/fetch"
import Apartment from "./apartment"

export default async function Home({ params }: { params: { number: string } }) {
    const data = await axiosInstance.get(`/apartments/tenant-looking/${params.number}`).then(res => res.data).catch(error => { })
    return (
        <div className="space-y-2">
            <Apartment data={data} />
        </div>
    )
}