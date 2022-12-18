import { Notification } from "@app/entities/notification"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { NotificationNotFound } from "./errors/notification-not-found"


describe('Cancel Notification', ()=>{
    it('should be able to cancel a notification', async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository()
        const CancelNotitification = new CancelNotification(notificationsRepository)

        const notification = new Notification(
            makeNotification({recipientId:'example-recipient-id'})
        )

        await notificationsRepository.create(notification)

        await CancelNotitification.axecute({
           notificationId:notification.id
        })
        
        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
    })

    it('should not be able to cancel a notification when it does not exist', async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository()
        const CancelNotitification = new CancelNotification(notificationsRepository)

        expect(()=>{
            return  CancelNotitification.axecute({
                notificationId:'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})