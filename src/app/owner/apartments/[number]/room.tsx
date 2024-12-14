import Image from "next/image";

export default function Room({ room }: { room: any }) {
    return (
        <div>
            {room.image ?

                <div className="w-full h-[300px] md:w-[450px] relative">
                    <Image
                        className="rounded-lg"
                        src={room.image}
                        fill
                        alt=""
                    />
                </div>
                :
                <div>
                    Chưa có hình ảnh
                </div>}
            <div className="text-center w-full">{room.name} ({room.acreage}m&#178;)</div>
        </div>
    )
}