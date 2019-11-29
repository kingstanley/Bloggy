import { PostService } from './../post/post.service';
import { AboutDto } from './dto/about.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { Response, Request } from 'express';
export declare class UserController {
    private userService;
    private postService;
    SERVER_URL: string;
    constructor(userService: UserService, postService: PostService);
    signup(userDto: UserDto, res: any): Promise<{
        message: string;
    }>;
    login(res: any): void;
    create(res: any): void;
    signin(res: Response): void;
    findAll(user: User): Promise<User[]>;
    uploadFile(user: User, body: any): Promise<User>;
    about(about: AboutDto, user: User): Promise<AboutDto>;
    signOut(req: Request, res: Response): void;
    dashboard(req: Request, res: Response, user: any): {
        posts: Promise<import("../post/entity/post.entity").Posts[]>;
    };
}
