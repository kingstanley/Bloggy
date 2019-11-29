import { AboutDto } from './dto/about.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class UserApiController {
    private userService;
    SERVER_URL: string;
    constructor(userService: UserService);
    signup(userDto: UserDto): Promise<{
        message: string;
    }>;
    signin(authCredentialDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    findAll(user: User): Promise<User[]>;
    uploadFile(user: User, body: any): Promise<User>;
    about(about: AboutDto, user: User): Promise<AboutDto>;
}
