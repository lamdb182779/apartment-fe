import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { axiosInstance, fetcher } from "@/service/fetch";
import useSWR from "swr";
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"
import { useTheme } from "next-themes";
import ChangeAccount from "./change-account";
import Profile from "./profile";

export default async function Home() {

    const data = await axiosInstance.get("/profile").then(res => res.data).catch(error => { })

    if (!data) return (<>Không có dữ liệu</>)

    const role = (role: number) => {
        switch (role) {
            case 11: return "Thành viên ban quản trị"
            case 12: return "Trưởng ban quản lý"
            case 21: return "Lễ tân"
            case 22: return "Kế toán"
            case 23: return "Kỹ thuật viên"
            case 31: return "Chủ hộ"
            case 32: return "Người thuê"
            default: return "Không rõ quyền hạn"
        }
    }
    return (
        <div className="space-y-2 md:scale-110 lg:w-[450px] mx-auto origin-top">
            <Profile data={data} />
            <ChangeAccount id={data.id} role={data.role} />
        </div>
    )
}