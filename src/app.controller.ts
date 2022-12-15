import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { PrismaService } from './prisma.service';
import {randomUUID} from 'node:crypto'
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}
  
    @Get()
    getHello() {
        return this.prisma.notification.findMany()
    }

    @Post()
    async created(@Body() body:CreateNotificationBody) {
        //console.log(body)
        const { recipientId, content, category} = body

        
        await this.prisma.notification.create({
            data:{
                id:randomUUID(),
                content,
                category,
                recipientId
            }
        })
        
    }
}
