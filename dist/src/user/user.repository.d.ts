import { MailerService } from '@nest-modules/mailer';
import { AboutDto } from './dto/about.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserRepository extends Repository<User> {
    mailer: MailerService;
    SERVER_URL: string;
    SignUp(userDto: import('./dto/user.dto').UserDto): Promise<User>;
    hashPassword(password: string, salt: string): Promise<any>;
    validateUserPassword(authCredentialDto: AuthCredentialsDto): Promise<User>;
    about(user: User, aboutDto: AboutDto): Promise<AboutDto>;
    setAvatar(user: User, avatar: any): Promise<User>;
}
