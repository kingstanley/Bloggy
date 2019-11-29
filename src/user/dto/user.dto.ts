import { IsBoolean, IsDate } from "class-validator";
import { isString } from "util";
import {
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  Matches,
  IsOptional
} from "class-validator";
import { IsNull } from "typeorm/find-options/operator/IsNull";

export class UserDto {
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(30)
  @MinLength(5)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(40)
  @MinLength(8)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.[a-z]).*$/, {
    message: `Password must contain at least 1 upper case letter, 1 lower case letter and 1 number or 1
  special character`
  })
  password: string;
 @IsString() 
 @IsOptional()
  password2: string;

  @MinLength(2)
  @MaxLength(30)
  @IsString()
  firstName: string;

  @MinLength(2)
  @MaxLength(100)
  @IsString()
  otherNames: string;

  @IsString()
  salt: string;

  @IsString()
  @IsOptional()
  token: string;
  
  @IsDate()
  @IsOptional()
  tokenExpiresAt: number;

  @IsBoolean()
  @IsOptional()
  confirmedEmail: boolean;

  @IsBoolean()
  @IsOptional()
  confirmedPhone: boolean;
}
