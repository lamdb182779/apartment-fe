"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { poster } from "@/service/fetch";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import Verify from "./verify";

export default function Home() {

    const { trigger, isMutating } = useSWRMutation("/auth/login", poster)
    const [showVerify, setShowVerify] = useState(false)

    const router = useRouter()

    const [role, setRole] = useState("owner")
    const [roleId, setRoleId] = useState("31")
    const [id, setId] = useState()
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const roles = [
        {
            value: "regent",
            id: "11",
            name: "Thành viên ban quản trị"
        },
        {
            value: "director",
            id: "12",
            name: "Trưởng ban quản lý"
        },
        {
            value: "receptionist",
            id: "21",
            name: "Lễ tân"
        },
        {
            value: "technician",
            id: "23",
            name: "Kỹ thuật viên"
        },
        {
            value: "accountant",
            id: "22",
            name: "Kế toán"
        },
        {
            value: "owner",
            id: "31",
            name: "Chủ căn hộ"
        },
        {
            value: "tentant",
            id: "32",
            name: "Người thuê"
        },
    ]

    const handleLogin = async () => {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        const result = roles.find((item) => item.value === role)
        const id = result ? result.id : "31"
        const user = await trigger({
            username: username,
            password: password,
            role: id
        })
        if (user) {
            if (user.message === "Tài khoản này chưa được xác thực!") {
                setShowVerify(true)
                setId(user.id)
                setRoleId(id)
            } else {
                localStorage.setItem("access_token", user.access_token)
                router.push("/")
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-6 rounded-lg shadow dark:shadow-white border">
                <h2 className="mb-6 text-2xl font-semibold text-center ">Đăng Nhập</h2>
                <div className="space-y-5">
                    <div>
                        <Label htmlFor="role">Vai Trò</Label>
                        <Select value={role} onValueChange={(value) => setRole(value)}>
                            <SelectTrigger id="role" className="mt-1">
                                <SelectValue placeholder="Chọn vai trò" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map(role =>
                                    <SelectItem key={role.id} value={role.value}>{role.name}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="username">Tên Đăng Nhập</Label>
                        <Input ref={usernameRef} id="username" type="text" placeholder="Nhập tên đăng nhập" className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="password">Mật Khẩu</Label>
                        <Input ref={passwordRef} id="password" type="password" placeholder="Nhập mật khẩu" className="mt-1" />
                    </div>

                    <Button disabled={isMutating} onClick={() => handleLogin()} className="w-full">
                        Đăng Nhập
                    </Button>
                    <Verify isOpen={showVerify} id={id} role={roleId} handleModal={setShowVerify} />
                </div>
            </div>
        </div>
    );
}
