import { axiosInstance } from "@/service/fetch";
import Service from "./service";

export default async function Home({ params }: { params: { id: string } }) {
    const data = await axiosInstance.get("/owners/apartments").then(res => res.data).catch(error => { })
    const service = await axiosInstance.get(`/services/${params.id}`).then(res => res.data).catch(error => { })
    if (!service) return (<h6 className="text-center">Không thấy yêu cầu dịch vụ</h6>)
    return (
        <Service service={service} numbers={data.map((item: any) => item.number)} />
    )
}