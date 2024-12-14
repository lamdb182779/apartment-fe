"use client"

import { useState } from "react"; import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import useSWRMutation from "swr/mutation";
import { updater } from "@/service/fetch";


export default function ChangeAccount({
    id,
    role
}: {
    id: string,
    role: number
}) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { trigger, isMutating } = useSWRMutation("/auth/change", updater)
    const handleChange = async () => {
        if (newPassword !== confirmPassword) {
            toast({
                description: "Mật khẩu mới và mật khẩu xác nhận không khớp!",
                variant: "destructive"
            })
        } else {
            const update = await trigger({
                currentPassword,
                newPassword,
                id,
                role
            })
            if (update) {
                setConfirmPassword("")
                setCurrentPassword("")
                setNewPassword("")
            }
        }

    }
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Đổi mật khẩu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                    <Input
                        type="password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                    <Input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                    <Input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button disabled={isMutating} onClick={() => handleChange()}>Đổi mật khẩu</Button>
            </CardFooter>
        </Card>
    )
}