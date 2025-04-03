"use client"

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import OwnerList from './owner';
import TentantList from './tentant';

export default function Home() {
    const [name, setName] = useState('');
    const [role, setRole] = useState("owner");

    return (
        <div className='w-full space-y-5 relative'>
            <div className='w-full flex gap-5'>
                <div className="flex items-center w-[250px]">
                    <Label htmlFor="role">Chức vụ:</Label>
                    <Select value={role} onValueChange={setRole}>
                        <SelectTrigger>
                            <SelectValue>{role === "owner" ? "Chủ hộ" : "Cư dân"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="owner">Chủ hộ</SelectItem>
                            <SelectItem value="tentant">Cư dân</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center grow">
                    <Label htmlFor="name">Tên:</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên"
                        required
                    />
                </div>
            </div>
            {role === "owner" ?
                <OwnerList name={name} />
                :
                <TentantList name={name} />
            }
        </div>
    );
}
