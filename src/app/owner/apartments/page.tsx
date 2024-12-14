import { Label } from "@/components/ui/label";
import Apartments from "./apartments";
import { axiosInstance } from "@/service/fetch";

export default async function Home() {

    const data = await axiosInstance.get("/owners/apartments").then(res => res.data).catch(error => { })
    return (
        <div className="space-y-2">
            <Label className="font-semibold text-center">
                Danh sách căn hộ
            </Label>
            <Apartments data={data} />
        </div>
    )
}