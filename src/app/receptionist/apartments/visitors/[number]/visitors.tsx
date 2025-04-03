"use client"
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { DatePicker } from "@/components/ui/date-picker";
import { startOfDay, format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSWR from 'swr';

export default function Visitors({ apart, apartments }: { apart: number, apartments: any }) {
    const [number, setNumber] = useState((apart && apartments.includes(apart)) ? apart : apartments[0]);
    const [time, setTime] = useState(startOfDay(new Date()))

    const { data, isLoading } = useSWR(`/visitors?number=${number}&time=${format(time, "yyyy-MM-dd")}`)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Danh sách khách thăm</h1>
            <div className="flex gap-4 mb-4">
                <DatePicker
                    date={time}
                    setDate={setTime as any}
                />

                <Select value={number.toString()} onValueChange={(value) => setNumber(parseInt(value))}>
                    <SelectTrigger className='w-[450px]' id="floor">
                        <SelectValue placeholder="Chọn tầng" />
                    </SelectTrigger>
                    <SelectContent>
                        {apartments.map((item: any) =>
                            <SelectItem key={item} value={item.number}>Căn hộ {item.numbber}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                data &&
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Tên</TableCell>
                            <TableCell>Tới thăm lúc</TableCell>
                            <TableCell>Số nhà</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((visitor: any) => (
                            <TableRow key={visitor.id}>
                                <TableCell>{visitor.name}</TableCell>
                                <TableCell>{format(new Date(visitor.visitedAt), "hh:mm dd/MM/yyyy")}</TableCell>
                                <TableCell>{visitor.apartment.number}</TableCell>
                                <TableCell>{visitor.hasLeft && "Đã rời đi"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}