"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_1 = require("@nest-modules/mailer");
const common_1 = require("@nestjs/common");
let NotificationService = class NotificationService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    newPostNotify() {
        this.mailerService
            .sendMail({
            to: 'kingstanley.ks16@gmail.com',
            from: 'standevcode@gmail.com',
            subject: 'Testing Nest MailerModule in standevcode ✔',
            html: '<b>welcome to standevcode.com</b>',
        })
            .then(() => { console.log('Mail delivered successfully'); })
            .catch((err) => { console.log('error delievering mail', err); });
    }
    async signUpSuccess(userEmail, token) {
        console.log("sending email");
        const url = `http://standevcode.com/user/verifyemail/${token}`;
        let html = `<p>Welcome ${userEmail}! Your standevcode.com account was created successfully.
            Please click on the url below to activate your account ${url}</p>
            <p>or <a href="http://standevcode.com/user/verifyemail/${token}">Click Here</a></p>
            <p>
            <b>Note: This link is only valid for 24h. </b>
            </p>
            `;
        const verify = await this.mailerService.sendMail({
            to: userEmail,
            from: 'info@standevcode.com',
            subject: 'Email Verification for standevcode.com',
            html,
        });
        console.log("verify: ", verify["accepted"]);
        return verify["accepted"];
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map