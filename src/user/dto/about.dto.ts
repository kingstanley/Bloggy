import { IsNotEmpty, IsString } from 'class-validator';


export class AboutDto{
    @IsString()
    @IsNotEmpty()
    about: string;
}