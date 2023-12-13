import { IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    username: string;

    @IsString()
    @MaxLength(20)
    @MinLength(4)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'Password too weak',
    })
    password: string;
}
