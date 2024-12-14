"use client"

import { Label } from "@/components/ui/label";
import { fetcher } from "@/service/fetch";
import useSWR from "swr";
import Apartment from "./apartment";
import { Accordion } from "@/components/ui/accordion";

export default function Apartments({ data }: { data: any }) {
    return (
        <div>
            {data?.length > 0 ?
                <>
                    <Accordion type="multiple">
                        {data.map((apartment: any) =>
                            <Apartment key={apartment.number} apartment={apartment} />
                        )}
                    </Accordion>
                </>
                :
                <>
                    Không có dữ liệu
                </>
            }
        </div>
    )
}