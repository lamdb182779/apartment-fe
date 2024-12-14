"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"
import { useTheme } from "next-themes";
import ChangeAccount from "./change-account";

export default function Profile({ data }: { data: any }) {

    const { theme } = useTheme()

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
        <Card className="w-full">
            <CardHeader className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={data.image ?? (theme == "dark" ? dark : light)} alt={data.name} />
                    <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-3">
                    <CardTitle>{data.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Điện thoại:</strong> {data.phone || "N/A"}</p>
                    <p><strong>Quyền hạn:</strong> {role(data.role)}</p>
                </div>
            </CardContent>
        </Card>
    )
}