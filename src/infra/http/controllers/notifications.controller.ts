import { Body,  Controller,  Post } from '@nestjs/common';
//import { Controller } from '@nestjs/common/decorators';
import { SendNotification } from '../../../app/use-case/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
    constructor(private sendNotification: SendNotification){}
    @Post()
    async created(@Body() body:CreateNotificationBody) {
        //console.log(body)
        const { recipientId, content, category} = body

        const {notification} = await this.sendNotification.axecute({
            recipientId,
            content,
            category
        })
        return { notification }
    }
}
