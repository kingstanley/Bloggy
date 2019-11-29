import { Strategy } from 'passport-local';
import { UserService } from './user.service';
declare const LocalStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(username: string, password: string): Promise<import("./user.entity").User>;
}
export {};
