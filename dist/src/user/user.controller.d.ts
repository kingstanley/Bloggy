import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signup(userDto: UserDto): Promise<{
        message: string;
    }>;
    signin(authCredentialDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    findAll(user: User): Promise<User[]>;
}
