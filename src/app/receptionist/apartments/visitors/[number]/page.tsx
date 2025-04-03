import Visitors from "./visitors";
import { axiosInstance } from "@/service/fetch";

export default async function Home({ params }: { params: { number: string } }) {
    const apartments = await axiosInstance.get("/apartments/ownered").then(res => res.data).catch(error => { })

    return (
        <Visitors apart={+params.number} apartments={apartments} />
    )
}