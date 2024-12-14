"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { updater } from "@/service/fetch"
import { useEffect, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Verify({
    id,
    role,
    isOpen,
    handleModal
}: {
    id?: string
    role: string
    isOpen: boolean
    handleModal: Function
}) {
    const { trigger: sendEmail, isMutating: isSending } = useSWRMutation("/auth/send", updater)

    const [value, setValue] = useState("")

    const { trigger: verifyEmail, isMutating: isVerifying } = useSWRMutation("/auth/verify", updater)

    const handleSend = async () => {
        if (isOpen && id) {
            const send = await sendEmail({
                id,
                role,
            })
        }
    }
    const router = useRouter()

    useEffect(() => {
        handleSend()
    }, [id, isOpen])

    const handleVerify = async () => {
        const verify = await verifyEmail({
            id,
            role,
            otp: value
        })
        if (verify) {
            handleModal(false)
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent hiddenClose className="w-full max-w-md p-6 rounded-lg shadow dark:shadow-white border">
                <DialogClose onClick={() => handleModal(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <DialogHeader>
                    <h2 className="mb-4 text-2xl font-semibold text-center">Xác thực email</h2>
                </DialogHeader>
                <div className="space-y-2">
                    <div className="text-center">Nhập mã OTP</div>
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={value}
                        onChange={(value) => setValue(value)}>
                        <InputOTPGroup className="mx-auto">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-center"><u onClick={() => handleSend()} className="cursor-pointer">Gửi lại mã</u></p>
                </div>
                <DialogFooter>
                    <Button
                        disabled={isVerifying}
                        onClick={() => handleVerify()}
                        className="mx-auto h-8"
                    >
                        Xác nhận
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}