import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserRepository extends Repository<User> {
    SignUp(userDto: import('./dto/user.dto').UserDto): Promise<{
        message: string;
    }>;
    hashPassword(password: string, salt: string): Promise<any>;
    validateUserPassword(authCredentialDto: AuthCredentialsDto): Promise<string>;
}
