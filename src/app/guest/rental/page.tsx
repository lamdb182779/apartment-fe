import { axiosInstance } from "@/service/fetch"

export default async function Home() {
    const data = await axiosInstance.get("/apartments/tenant-looking").then(res => res.data).catch(error => { })
    console.log(data);

    return (
        <></>
    )
}