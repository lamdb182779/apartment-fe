"use client"

import PaginationC from "@/components/pagination"
import { useState } from "react"
import useSWR from "swr"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { fetcher } from "@/service/fetch";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function Home() {
    const [page, setPage] = useState(1)
    const { data, isLoading } = useSWR(`/notifications?current=${page}`, fetcher)

    return (
        <div className="space-y-2">
            <h5 className="text-center">Danh sách thông báo</h5>
            {isLoading === false &&
                <>
                    {data?.results?.length > 0 ?
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Tiêu đề</TableCell>
                                        <TableCell>Ngày tạo</TableCell>
                                        <TableCell>Hành động</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.results.map((item: any) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{format(item.createdAt, "dd/MM/yyyy")}</TableCell>
                                            <TableCell>
                                                <Button size={"sm"} className="mr-2">
                                                    Xem chi tiết
                                                </Button>
                                                <Button size={"sm"} variant="destructive">
                                                    Xoá
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <PaginationC length={data.totalPages} page={page} handlePage={setPage} />
                        </>
                        :
                        <>Không có dữ liệu</>
                    }
                </>
            }
        </div>
    )
}