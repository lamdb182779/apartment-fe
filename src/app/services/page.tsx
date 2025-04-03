import { axiosInstance } from "@/service/fetch"
import Services from "./services"

export default async function Home() {
    const services = await axiosInstance.get("/services/self").then(res => res.data).catch(error => { })

    return (
        <div>
            <h5 className="text-center font-semibold">Danh sách yêu cầu</h5>
            <Services services={services} />
        </div>
    )
}