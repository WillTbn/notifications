import { Notification } from "@app/entities/notification";

export class notificationViewModel{
    static toHTTP(notification:Notification){
        return {
            id:notification.id,
            content:notification.content,
            category:notification.category,
            recipientId:notification.recipientId
        }

    }
}