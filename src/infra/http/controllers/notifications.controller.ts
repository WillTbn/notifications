import { CancelNotification } from '@app/use-case/cancel-notification';
import { CountRecipientNotifications } from '@app/use-case/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-case/get-recipient-notifications';
import { ReadNotification } from '@app/use-case/read-notification';
import { UnreadNotification } from '@app/use-case/unread-notification';
import { Body,  Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { SendNotification } from 'src/app/use-case/send-notification';
//import { SendNotification } from '../../../app/use-case/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { notificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private sendNotification: SendNotification,
        private cancelNotification: CancelNotification,
        private readNotification: ReadNotification,
        private unreadNotification: UnreadNotification,
        private countRecipientNotifications: CountRecipientNotifications,
        private getRecipientNotification: GetRecipientNotifications
        
    ){}

    @Patch(':id/cancel')
    async cancel(@Param('id') id:string){
        await this.cancelNotification.axecute({
            notificationId : id
        })
    }

    @Get('count/from/:recipientId')
    async countFromRecipient(@Param('recipientId') recipientId:string):Promise<{count:number}>{
        const { count } = await this.countRecipientNotifications.axecute({
            recipientId
        })

        return { count }
    }
    @Get('from/:recipientId')
    async getFromRecipient(@Param('recipientId') recipientId:string){
        const { notifications } = await this.getRecipientNotification.axecute({
            recipientId
        })

        return { notifications: notifications.map(notificationViewModel.toHTTP) }
    }

    @Patch(':id/read')
    async read(@Param('id') id:string){
        await this.readNotification.axecute({
            notificationId : id
        })
    }

    @Patch(':id/unread')
    async unread(@Param('id') id:string){
        await this.unreadNotification.axecute({
            notificationId : id
        })
    }

    @Post()
    async create(@Body() body:CreateNotificationBody) {
        //console.log(body)
        const { recipientId, content, category} = body

        const { notification } = await this.sendNotification.axecute({
            recipientId,
            content,
            category
        })
        return { 
            notification : notificationViewModel.toHTTP(notification)
        }
    }
}
