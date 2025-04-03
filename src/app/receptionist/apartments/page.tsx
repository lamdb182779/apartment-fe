"use client"

import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSWR from 'swr';
import PaginationC from '@/components/pagination';
import { fetcher } from '@/service/fetch';
import { useRouter } from 'next/navigation';

const ApartmentsList = () => {
    const floors = Array.from({ length: 20 }, (_, i) => i + 1)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [floor, setFloor] = useState(1)

    const { data, isLoading, mutate } = useSWR(`/apartments?current=${page}&pageSize=${pageSize}&floor=${floor}`, fetcher)

    const router = useRouter()
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Apartments List</h1>
            <div className="mb-4 flex gap-4">
                <Select onValueChange={(value) => setPageSize(Number(value))} defaultValue={pageSize.toString()}>
                    <SelectTrigger className='w-[450px]'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 căn hộ</SelectItem>
                        <SelectItem value="10">10 căn hộ</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={floor.toString()} onValueChange={(value) => setFloor(parseInt(value))}>
                    <SelectTrigger className='w-[450px]' id="floor">
                        <SelectValue placeholder="Chọn tầng" />
                    </SelectTrigger>
                    <SelectContent>
                        {floors.map(floor =>
                            <SelectItem key={floor} value={floor.toString()}>Tầng {floor}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
            {!isLoading &&
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Số căn hộ</TableCell>
                            <TableCell>Diện tích</TableCell>
                            <TableCell>Tầng</TableCell>
                            <TableCell>Trục</TableCell>
                            <TableCell>Xem khách đến thăm</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.results.map((apartment: any) => (
                            <TableRow key={apartment.number}>
                                <TableCell>{apartment.number}</TableCell>
                                <TableCell>{apartment.acreage}</TableCell>
                                <TableCell>{apartment.floor}</TableCell>
                                <TableCell>{apartment.axis}</TableCell>
                                <TableCell className='italic underline text-xs'>
                                    <div onClick={() => router.push(`/receptionist/apartments/visitors/${apartment.number}`)} className='cursor-pointer'>Xem</div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
            <PaginationC page={page} length={data?.totalPages} handlePage={setPage} />
        </div>
    );
};

export default ApartmentsList;
