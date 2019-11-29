import { NotificationService } from './../notification/notification/notification.service';
import { AboutDto } from './dto/about.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userRepository;
    private notification;
    private jwtService;
    constructor(userRepository: UserRepository, notification: NotificationService, jwtService: JwtService);
    SignuP(userDto: UserDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<User[]>;
    SignInLocal(authCredentials: AuthCredentialsDto): Promise<User>;
    SignIn(authCredentialDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    about(user: User, aboutDto: AboutDto): Promise<AboutDto>;
    setAvatar(user: User, avatar: any): Promise<User>;
}
