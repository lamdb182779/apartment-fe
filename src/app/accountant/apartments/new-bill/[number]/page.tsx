import { axiosInstance } from "@/service/fetch";
import NewBill from "./new";
import { notFound } from "next/navigation";
import { v4 as uuidv4 } from 'uuid'
import { format } from "date-fns";

export default async function Home({ params, searchParams }: { params: { number: number }, searchParams: { month: string } }) {
    const NEXT_PUBLIC_CLIENT_DOMAIN = process.env.NEXT_PUBLIC_CLIENT_DOMAIN
    const number = Number(params.number)

    if (isNaN(number)) {
        notFound()
    }

    const checkOwner = await axiosInstance.get(`/apartments/check-owner?number=${number}`).then(res => res.data).catch(error => { })

    if (!checkOwner) return (<>Căn hộ vô chủ, không thể lập hóa đơn</>)

    const date = new Date(searchParams.month)
    const id = uuidv4()

    if (!isNaN(date.getTime())) {
        const nearestParas = await axiosInstance.get(`/apartments/nearest?number=${number}&time=${searchParams.month}`).then(res => res.data).catch(error => { })
        const preElec = +nearestParas.electric[0]
        const curElec = +nearestParas.electric[1]
        const elec = curElec - preElec
        const elecAmount = elec * 3500
        const preWtr = +nearestParas.water[0]
        const curWtr = +nearestParas.water[1]
        const water = curWtr - preWtr
        const waterAmount = water * 7500
        const service = +nearestParas.acreage
        const svcAmount = service * 6500
        const curAmount = svcAmount + waterAmount + elecAmount
        const curDebt = +nearestParas.debt
        const sumAmount = curAmount + curDebt
        const initial = [
            {
                "id": "1",
                "type": "p",
                "children": [
                    {
                        "text": `Bảng thống kê hóa đơn dịch vụ tháng ${format(searchParams.month, "MM/yyyy")}`,
                        "bold": true
                    }
                ],
                "align": "center"
            },
            {
                "type": "p",
                "children": [
                    {
                        "text": `Khách hàng: ${checkOwner}`,
                    }
                ],
            },
            {
                "type": "p",
                "children": [
                    {
                        "text": `Căn hộ: ${number}`,
                    }
                ],
            },
            {
                "type": "p",
                "children": [
                    {
                        "text": `Mã hóa đơn: ${id}`,
                    }
                ],
            },
            {
                "type": "p",
                "children": [
                    {
                        "text": `Ngày: ${format(new Date(), "dd/MM/yyyy")}`,
                    }
                ],
            },
            {
                "type": "table",
                "children": [
                    {
                        "type": "tr",
                        "children": [
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Tên dịch vụ"
                                            }
                                        ],
                                        "id": "zz94q"
                                    }
                                ],
                                "id": "zmq02"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Đơn giá"
                                            }
                                        ],
                                        "id": "cgmb7"
                                    }
                                ],
                                "id": "m4ewn"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Số lượng"
                                            }
                                        ],
                                        "id": "ovihu"
                                    }
                                ],
                                "id": "wgxtb"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Chỉ số đầu "
                                            }
                                        ],
                                        "id": "95uav"
                                    }
                                ],
                                "id": "eqhy1"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Chỉ số cuối "
                                            }
                                        ],
                                        "id": "jf8c2"
                                    }
                                ],
                                "id": "4j5cx"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Tổng"
                                            }
                                        ],
                                        "id": "nqgog"
                                    }
                                ],
                                "id": "xce8y"
                            }
                        ],
                        "id": "mhk17"
                    },
                    {
                        "type": "tr",
                        "children": [
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Điện"
                                            }
                                        ],
                                        "id": "hrxf4"
                                    }
                                ],
                                "id": "tcu8i"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "3500"
                                            }
                                        ],
                                        "id": "s8izj"
                                    }
                                ],
                                "id": "z40uq"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${elec}`
                                            }
                                        ],
                                        "id": "lyvx1"
                                    }
                                ],
                                "id": "yk4xi"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${preElec}`
                                            }
                                        ],
                                        "id": "cx7kn"
                                    }
                                ],
                                "id": "7miz3"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${curElec}`
                                            }
                                        ],
                                        "id": "tibtn"
                                    }
                                ],
                                "id": "9xain"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${elecAmount}`
                                            }
                                        ],
                                        "id": "nrqd7"
                                    }
                                ],
                                "id": "trnak"
                            }
                        ],
                        "id": "1rs7z"
                    },
                    {
                        "type": "tr",
                        "children": [
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Nước"
                                            }
                                        ],
                                        "id": "0plqs"
                                    }
                                ],
                                "id": "q2x2v"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "7500"
                                            }
                                        ],
                                        "id": "vv8kk"
                                    }
                                ],
                                "id": "rep5l"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${water}`
                                            }
                                        ],
                                        "id": "4kccm"
                                    }
                                ],
                                "id": "8rris"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${preWtr}`
                                            }
                                        ],
                                        "id": "zq4o3"
                                    }
                                ],
                                "id": "9dlaq"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${curWtr}`
                                            }
                                        ],
                                        "id": "e90kf"
                                    }
                                ],
                                "id": "6xm5k"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${waterAmount}`
                                            }
                                        ],
                                        "id": "2qcto"
                                    }
                                ],
                                "id": "4rp0u"
                            }
                        ],
                        "id": "hyq3x"
                    },
                    {
                        "type": "tr",
                        "children": [
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Dịch vụ"
                                            }
                                        ],
                                        "id": "jgvxa"
                                    }
                                ],
                                "id": "cf4ad"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "6500"
                                            }
                                        ],
                                        "id": "fvm05"
                                    }
                                ],
                                "id": "xb2xd"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${service}`
                                            }
                                        ],
                                        "id": "x20fy"
                                    }
                                ],
                                "id": "z5m5g"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "kuy7q"
                                    }
                                ],
                                "id": "6mvtf"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "cmfxu"
                                    }
                                ],
                                "id": "5et2h"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${svcAmount}`
                                            }
                                        ],
                                        "id": "yijwj"
                                    }
                                ],
                                "id": "qey1x"
                            }
                        ],
                        "id": "5hp7o"
                    },
                    {
                        "type": "tr",
                        "children": [
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Tổng"
                                            }
                                        ],
                                        "id": "0pv30"
                                    }
                                ],
                                "id": "ademu"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "rewdx"
                                    }
                                ],
                                "id": "1sziu"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "zk0k0"
                                    }
                                ],
                                "id": "vhvj8"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "u3lg7"
                                    }
                                ],
                                "id": "gkse0"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "blmcf"
                                    }
                                ],
                                "id": "ef557"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${curAmount}`
                                            }
                                        ],
                                        "id": "s602r"
                                    }
                                ],
                                "id": "ab43k"
                            }
                        ],
                        "id": "pjk28"
                    }
                ],
                "id": "d74yw"
            },
            {
                "type": "table",
                "children": [
                    {
                        "type": "tr",
                        "children": [
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Dư nợ"
                                            }
                                        ],
                                        "id": "0vcnk"
                                    }
                                ],
                                "id": "cuujs"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${curDebt}`
                                            }
                                        ],
                                        "id": "fmhzf"
                                    }
                                ],
                                "id": "eg2d1"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "gt4ek"
                                    }
                                ],
                                "id": "po7zj"
                            }
                        ],
                        "id": "xkyde"
                    },
                    {
                        "type": "tr",
                        "children": [
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Tổng thu hiện tại"
                                            }
                                        ],
                                        "id": "rfy0u"
                                    }
                                ],
                                "id": "n96iy"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${curAmount}`
                                            }
                                        ],
                                        "id": "el882"
                                    }
                                ],
                                "id": "1023s"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            },
                                            {
                                                "type": "a",
                                                "url": `${NEXT_PUBLIC_CLIENT_DOMAIN}/payment/bill/${id}`,
                                                "children": [
                                                    {
                                                        "text": "Thanh toán hóa đơn này"
                                                    }
                                                ],
                                                "id": "uz9wg"
                                            },
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "c85uj"
                                    }
                                ],
                                "id": "kp1qb"
                            }
                        ],
                        "id": "tkkpo"
                    },
                    {
                        "type": "tr",
                        "children": [
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": "Tổng cộng",
                                                "bold": true
                                            }
                                        ],
                                        "id": "fws3z"
                                    }
                                ],
                                "id": "nceyo"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": `${sumAmount}`
                                            }
                                        ],
                                        "id": "cfopz"
                                    }
                                ],
                                "id": "s2vun"
                            },
                            {
                                "type": "td",
                                "children": [
                                    {
                                        "type": "p",
                                        "children": [
                                            {
                                                "text": ""
                                            },
                                            {
                                                "type": "a",
                                                "url": `${NEXT_PUBLIC_CLIENT_DOMAIN}/payment/apartment/${number}`,
                                                "children": [
                                                    {
                                                        "text": "Thanh toán toàn bộ"
                                                    }
                                                ],
                                                "id": "s5dsg"
                                            },
                                            {
                                                "text": ""
                                            }
                                        ],
                                        "id": "wbi9n"
                                    }
                                ],
                                "id": "5imoi"
                            }
                        ],
                        "id": "em52n"
                    }
                ],
                "id": "i8wo7"
            },
        ]
        return <NewBill id={id} tp={"Dịch vụ điện nước"} tit={`Hóa đơn dịch vụ điện nước tháng ${format(date, "MM/yyyy")}`} number={params.number} initial={initial} curAmount={curAmount} />
    }
    return (
        <NewBill id={id} number={params.number} />
    )
}