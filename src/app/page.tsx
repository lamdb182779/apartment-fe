'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Building2, Bell, Wrench, FileText } from "lucide-react";
import Image from "next/image";
import dashboard from "@/assets/dashboard.png"
import request from "@/assets/request.png"
import payment from "@/assets/payment.png"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="px-6 py-12 md:px-16 lg:px-32space-y-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Quản lý chung cư <span className="text-yellow-500">toàn diện</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto">
          Buildad giúp bạn vận hành toà nhà dễ dàng hơn, từ quản lý cư dân đến xử lý kỹ thuật, thu phí dịch vụ – tất cả trong một nền tảng duy nhất.
        </p>
      </div>

      {/* Carousel ảnh mô tả */}
      <div className="max-w-4xl mx-auto">
        <Carousel className="w-full max-w-4xl">
          <CarouselContent>
            <CarouselItem>
              <Image
                src={dashboard}
                alt="Dashboard quản lý"
                className="rounded-xl shadow-lg object-cover w-full h-auto"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={request}
                alt="Quản lý yêu cầu kỹ thuật"
                className="rounded-xl shadow-lg object-cover w-full h-auto"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={payment}
                alt="Thanh toán phí dịch vụ"
                className="rounded-xl shadow-lg object-cover w-full h-auto"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Các khối tính năng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<Building2 size={36} />}
          title="Quản lý cư dân & căn hộ"
          desc="Thông tin cư dân, chủ hộ, hợp đồng thuê – tất cả được lưu trữ và truy xuất nhanh chóng."
        />
        <FeatureCard
          icon={<Bell size={36} />}
          title="Thông báo & phản hồi"
          desc="Gửi thông báo tới cư dân và nhận phản hồi trực tiếp qua hệ thống."
        />
        <FeatureCard
          icon={<Wrench size={36} />}
          title="Yêu cầu kỹ thuật"
          desc="Tiếp nhận, xử lý và theo dõi các yêu cầu sửa chữa, sự cố nhanh chóng."
        />
        <FeatureCard
          icon={<FileText size={36} />}
          title="Thu phí dịch vụ"
          desc="Tự động tính phí, gửi hóa đơn và nhắc nhở thanh toán định kỳ."
        />
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <button onClick={() => router.push("/guest/rental")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl shadow-md transition">
          Khám phá ngay
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: JSX.Element; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
      <div className="text-yellow-500 mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

