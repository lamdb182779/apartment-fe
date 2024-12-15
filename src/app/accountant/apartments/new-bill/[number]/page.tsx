import { axiosInstance } from "@/service/fetch";
import NewBill from "./new";
import { notFound } from "next/navigation";

export default async function Home({ params, searchParams }: { params: { number: number }, searchParams: { month: string } }) {
    const number = Number(params.number)

    if (isNaN(number)) {
        notFound()
    }

    const checkOwner = await axiosInstance.get(`/apartments/check-owner?number=${number}`).then(res => res.data).catch(error => { })

    if (!checkOwner) return (<>Căn hộ vô chủ, không thể lập hóa đơn</>)

    const date = new Date(searchParams.month)
    if (!isNaN(date.getTime())) {
        return <NewBill number={params.number} month={searchParams.month} />
    }
    return (
        <NewBill number={params.number} />
    )
}