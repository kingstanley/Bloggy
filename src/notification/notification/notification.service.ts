import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {

    constructor(private readonly mailerService: MailerService) {}

    /**
     * Notify subscribers of new content
     */
    newPostNotify() {
        // console.log("Notifying...")
        this.mailerService
        .sendMail({
          to: 'kingstanley.ks16@gmail.com', // sender address
          from: 'standevcode@gmail.com', // list of receivers
          subject: 'Testing Nest MailerModule in standevcode ✔', // Subject line
        //   text: 'welcome to standevcode' // plaintext body
          html: '<b>welcome to standevcode.com</b>', // HTML body content
        })
        .then(() => {console.log('Mail delivered successfully'); })
        .catch((err) => {console.log('error delievering mail', err); });
    }
    async signUpSuccess(userEmail, token) {
      console.log("sending email")
      const url = `http://standevcode.com/user/verifyemail/${token}`;

      let   html = `<p>Welcome ${userEmail}! Your standevcode.com account was created successfully.
            Please click on the url below to activate your account ${url}</p>
            <p>or <a href="http://standevcode.com/user/verifyemail/${token}">Click Here</a></p>
            <p>
            <b>Note: This link is only valid for 24h. </b>
            </p>
            `;

      const verify =  await  this.mailerService.sendMail({
        to: userEmail,
        from: 'info@standevcode.com',
        subject: 'Email Verification for standevcode.com',
        html,
      });
      console.log("verify: ", verify["accepted"]);

      return verify["accepted"];
    }
}
