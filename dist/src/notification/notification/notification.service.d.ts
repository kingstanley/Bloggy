import { MailerService } from '@nest-modules/mailer';
export declare class NotificationService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    newPostNotify(): void;
    signUpSuccess(userEmail: any, token: any): Promise<any>;
}
