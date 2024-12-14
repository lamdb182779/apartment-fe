import { axiosInstance } from "@/service/fetch";
import Apartment from "./apartment";
import { error } from "console";

export default async function ({ params }: { params: { number: string } }) {
    const data = await axiosInstance.get(`/apartments/${+params.number}`).then(res => res.data).catch(error => { })
    if (!data) return <>Không có dữ liệu</>
    return (
        <Apartment data={data} />
    )
}