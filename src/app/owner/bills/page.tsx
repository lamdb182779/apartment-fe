import { auth } from "@/auth";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/service/fetch";
import Bill from "./bill";

export default async function Home() {
    const session = await auth()
    const data = await axiosInstance.get(`/bills/owner/${(session?.user as any).id}`).then(res => res.data).catch(error => { })
    if (!data || data.length === 0) return <>Không có dữ liệu</>
    return (
        <div className="space-y-2">
            <Label className="font-semibold text-center">
                Danh sách hóa đơn
            </Label>
            <Accordion type="multiple">
                {data.map((apartment: any) =>
                    <AccordionItem key={apartment.number} value={apartment.number}>
                        <AccordionTrigger>
                            Căn hộ {apartment.number}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2">
                            {apartment?.bills?.length > 0 ?
                                <>
                                    {apartment.bills.map((bill: any) =>
                                        <Bill key={bill.id} bill={bill} />)}
                                </>
                                :
                                <>Không có hóa đơn</>
                            }
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        </div>
    )
}