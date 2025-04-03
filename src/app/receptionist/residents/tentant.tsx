"use client"

import { useState } from "react"
import useSWR from "swr"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PaginationC from "@/components/pagination";
import { fetcher } from "@/service/fetch";
import { Plus } from "lucide-react";

export default function TenantList({ name }: { name: string }) {
    const [page, setPage] = useState(1)
    const { data, isLoading } = useSWR(`tenants?current=${page}&name=${name}`, fetcher)
    const handleCreate = () => {

    }
    return (
        <>
            {isLoading === false &&
                <>
                    <Button onClick={() => handleCreate()} size={"icon"} className="rounded-full top-[6.5rem] left-[95vw] sticky z-[70]">
                        <Plus />
                    </Button>
                    {data?.results?.length > 0 ?
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Căn hộ sở hữu</TableCell>
                                        <TableCell>Đã xác thực</TableCell>
                                        <TableCell>Hành động</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.results.map((item: any) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.apartment.number}</TableCell>
                                            <TableCell>{item.isVerify ? 'Đã xác thực' : 'Chưa'}</TableCell>
                                            <TableCell>
                                                <Button size={"sm"} className="mr-2">
                                                    Xem chi tiết
                                                </Button>
                                                <Button size={"sm"} variant="destructive">
                                                    Ngừng kích hoạt
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <PaginationC length={data.totalPages} handlePage={setPage} page={page} />
                        </>
                        :
                        <>Không có dữ liệu</>
                    }
                </>
            }
        </>
    )
}