import { axiosInstance } from "@/service/fetch";
import Service from "../service";
import NewService from "./new-service";

export default async function Home() {
    const data = await axiosInstance.get("/owners/apartments").then(res => res.data).catch(error => { })
    return (
        <NewService numbers={data.map((item: any) => item.number)} />
    )
}