import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userEntityRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userEntityRepository.create({
            username,
            password: hashedPassword,
        });
        try {
            await this.userEntityRepository.save(user);
        } catch (error) {
            // https://www.postgresql.org/docs/9.3/errcodes-appendix.html
            console.log(error.code);
            if (error.code === '23505') {
                throw new Error('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        return user;
    }

    findOne(username: string): Promise<User> {
        return this.userEntityRepository.findOne({ where: { username } });
    }
}
