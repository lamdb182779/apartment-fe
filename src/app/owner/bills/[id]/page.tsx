import { axiosInstance } from "@/service/fetch"
import Bill from "./bill"

export default async function Home({ params }: { params: { id: string } }) {
    const data = await axiosInstance(`/bills/${params.id}`).then(res => res.data).catch(error => { })
    if (!data) return (<>Không có dữ liệu</>)
    return (
        <div className="space-y-2">
            <h3 className="font-semibold text-center">{data.title}</h3>
            <Bill bill={data} />
        </div>
    )
}