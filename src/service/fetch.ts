import { toast } from "@/hooks/use-toast"
import axios from "axios"

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN

export const axiosInstance = axios.create({
    baseURL: SERVER_DOMAIN
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const fetcher = (path: string) => axiosInstance.get(path, {
    withCredentials: true
})
    .then(res => res.data)

export const logout = async () => {
    const data = await fetcher("/logout")
    if (data.message === "Log out successfully!") return true
    else return false
}

export const updater = async (path: string, { arg }: { arg: object }) => axiosInstance.patch(path, arg, {
    withCredentials: true
})
    .then(res => {
        toast({
            description: res?.data?.message || "Cập nhật thành công!"
        })
        return res.data
    }).catch(error => {
        toast({
            description: error?.response?.data?.message || "Cập nhật thất bại!",
            variant: "destructive"
        })
    })

export const poster = async (path: string, { arg }: { arg: object }) => axiosInstance.post(path, arg, {
    withCredentials: true
})
    .then(res => {
        toast({
            description: res?.data?.message || "Thêm mới thành công!"
        })
        return res.data
    }).catch(error => {
        toast({
            description: error?.response?.data?.message || "Thêm mới thất bại!",
            variant: "destructive"
        })
    })

export const deleter = async (path: string, { arg }: { arg: object }) => axiosInstance.delete(path, {
    data: arg,
    withCredentials: true
})
    .then(res => {
        toast({
            description: res?.data?.message || "Xóa thành công!"
        })
        return res.data
    }).catch(error => {
        toast({
            description: error?.response?.data?.message || "Xóa thất bại!",
            variant: "destructive"
        })
    })