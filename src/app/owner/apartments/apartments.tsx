"use client"

import Apartment from "./apartment";

export default function Apartments({ data }: { data: any }) {
    return (
        <div className="gap-5 grid grid-cols-2">
            {data?.length > 0 ?
                <>
                    {data.map((apartment: any) =>
                        <Apartment key={apartment.number} apartment={apartment} />
                    )}
                </>
                :
                <>
                    Không có dữ liệu
                </>
            }
        </div>
    )
}