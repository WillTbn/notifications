import { Notification } from "@app/entities/notification"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "./errors/notification-not-found"
import { ReadNotification } from "./read-notification"


describe('Read Notification', ()=>{
    it('should be able to read a notification', async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotitification = new ReadNotification (notificationsRepository)

        const notification = new Notification(
            makeNotification({recipientId:'example-recipient-id'})
        )

        await notificationsRepository.create(notification)

        await readNotitification.axecute({
           notificationId:notification.id
        })
        
        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
    })

    it('should not be able to read a notification when it does not exist', async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotitification = new ReadNotification(notificationsRepository)

        expect(()=>{
            return  readNotitification.axecute({
                notificationId:'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})