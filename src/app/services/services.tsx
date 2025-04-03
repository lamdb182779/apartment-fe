"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Service from "./service";

export default function Services({ services }: { services: any }) {
    const router = useRouter()
    const handleCreate = () => {
        router.push("/services/new")
    }
    return (
        <div className="space-y-5">
            <Button variant={"outline"} className="w-full" onClick={() => handleCreate()}>Tạo mới yêu cầu</Button>
            {services?.length > 0 &&
                <>
                    {services.map((item: any) =>
                        <Service service={item} />
                    )}
                </>
            }
        </div>
    )
}