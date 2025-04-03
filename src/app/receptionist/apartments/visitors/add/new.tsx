import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewVisitor({ apartments }: { apartments: any }) {
    const [name, setName] = useState("");
    const [visitedAt, setVisitedAt] = useState(new Date());
    const [hasLeft, setHasLeft] = useState(false);
    const [number, setNumber] = useState(apartments[0]);

    const handleAdd = () => {

    }

    return (
        <div className="space-y-4">
            <div>
                <Select value={number.toString()} onValueChange={(value) => setNumber(parseInt(value))}>
                    <SelectTrigger className='w-[450px]' id="floor">
                        <SelectValue placeholder="Chọn tầng" />
                    </SelectTrigger>
                    <SelectContent>
                        {apartments.map((item: any) =>
                            <SelectItem key={item} value={item.toString()}>Căn hộ {item}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Tên</label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên khách"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Visited At</label>
                <DatePicker
                    date={visitedAt}
                    setDate={setVisitedAt as any}
                />
            </div>
            <Button onClick={() => handleAdd()}>
                Thêm khách thăm
            </Button>
        </div>
    );
};
