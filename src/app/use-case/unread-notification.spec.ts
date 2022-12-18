import { Notification } from "@app/entities/notification"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "./errors/notification-not-found"
import { UnreadNotification } from "./unread-notification"


describe('UnRead Notification', ()=>{
    it('should be able to unread a notification', async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotitification = new UnreadNotification (notificationsRepository)

        const notification = new Notification(
            makeNotification({readAt: new Date()})
        )

        await notificationsRepository.create(notification)

        await unreadNotitification.axecute({
           notificationId:notification.id
        })
        
        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    })

    it('should not be able to unread a notification when it does not exist', async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotitification = new UnreadNotification(notificationsRepository)

        expect(()=>{
            return  unreadNotitification.axecute({
                notificationId:'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})