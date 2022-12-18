import { CancelNotification } from "@app/use-case/cancel-notification";
import { CountRecipientNotifications } from "@app/use-case/count-recipient-notifications";
import { GetRecipientNotifications } from "@app/use-case/get-recipient-notifications";
import { ReadNotification } from "@app/use-case/read-notification";
import { UnreadNotification } from "@app/use-case/unread-notification";
import { Module } from "@nestjs/common";
import { SendNotification } from "src/app/use-case/send-notification";
import { DatabaseModule } from "../database/database.module";


import { NotificationsController } from "./controllers/notifications.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
        ReadNotification,
        UnreadNotification,
        CancelNotification,
        CountRecipientNotifications,
        GetRecipientNotifications
    ],
})
export class HttpModule {}