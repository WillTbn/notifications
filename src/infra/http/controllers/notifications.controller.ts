import { Body,  Controller,  Post } from '@nestjs/common';
import { SendNotification } from 'src/app/use-case/send-notification';
//import { SendNotification } from '../../../app/use-case/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { notificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
    constructor(private sendNotification: SendNotification){}
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
