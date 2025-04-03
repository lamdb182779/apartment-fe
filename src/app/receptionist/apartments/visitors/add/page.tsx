import { axiosInstance } from "@/service/fetch";
import NewVisitor from "./new";

export default async function Home() {
    const apartments = await axiosInstance.get("/apartments/ownered").then(res => res.data).catch(error => { })

    return (
        <NewVisitor apartments={apartments} />
    )
}