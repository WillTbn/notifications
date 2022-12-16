import { Notification } from "../../../../app/entities/notification";
import { NotificationRepository } from "../../../../app/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";

export class PrismaNotificationRepository implements NotificationRepository{
    constructor (private prismaService:PrismaService){}

    async create(notification: Notification): Promise<void> {
        await this.prismaService.notification.create({
            data:{
                id:notification.id,
                category: notification.category,
                content: notification.content.value,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                createdAt: notification.createdAt
            }
        })
    }

}