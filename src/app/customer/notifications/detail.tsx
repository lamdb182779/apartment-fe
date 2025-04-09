import { PlateView } from "@/components/plate-editor";

export default function Detail({ notification }: { notification: any }) {
    return (

        <div className="space-y-5 w-4/5">
            {notification &&
                <>
                    <h5>{notification.title}</h5>
                    <div className="whitespace-pre-line text-sm">{notification.describe}</div>
                    <PlateView content={notification.content} />
                </>
            }
        </div>
    )
}