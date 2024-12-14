
import { MouseEvent, useState } from "react";
import { subMonths, format, addMonths } from "date-fns";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";

export default function MonthPicker({
    date,
    setDate
}: {
    date: Date
    setDate: Function
}) {
    const handlePreMonth = (event: MouseEvent) => {
        event.stopPropagation()
        setDate(subMonths(date, 1))
    }

    const handleNextMonth = (event: MouseEvent) => {
        event.stopPropagation()
        setDate(addMonths(date, 1))
    }
    return (
        <div className="flex items-center w-full lg:w-[250px]">
            <SquareChevronLeft className="cursor-pointer" onClick={event => handlePreMonth(event)} />
            <div className="grow text-center font-semibold">tháng {format(date, "MM yyyy")}</div>
            <SquareChevronRight className="cursor-pointer" onClick={event => handleNextMonth(event)} />
        </div>
    )
}