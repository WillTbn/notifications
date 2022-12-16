import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";

import { SendNotification } from "../../app/use-case/send-notification";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [SendNotification],
})
export class HttpModule {}