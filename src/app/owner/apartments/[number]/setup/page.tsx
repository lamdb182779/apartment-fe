import { axiosInstance } from "@/service/fetch";
import { error } from "console";
import Setup from "./setup";

export default async function ({ params }: { params: { number: string } }) {
    const data = await axiosInstance.get(`/apartments/${+params.number}`).then(res => res.data).catch(error => { })
    if (!data) return <>Không có dữ liệu</>
    return (
        <Setup data={data} />
    )
}