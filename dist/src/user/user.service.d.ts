import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    SignuP(userDto: UserDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<User[]>;
    SignIn(authCredentialDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
