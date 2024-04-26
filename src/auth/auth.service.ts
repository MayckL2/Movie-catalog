import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponse } from './auth.model';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpiration: number

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){
        this.jwtExpiration = +this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    // Logar o usuario verificando username e passaword
    // Se login bem sucedido é retornado o token para o usuario e o tempo de expiração
    async signIn(username: string, password: string): Promise<AuthResponse>{
        const foundUser = await this.userService.findByUserName(username)

        if(!foundUser || !compareSync(password, foundUser.password)){
            throw new UnauthorizedException()
        }

        const payload = {sub: foundUser.id, username: foundUser.username}
        
        const token = this.jwtService.sign(payload)

        return {token, expiresIn: this.jwtExpiration}
    }
}
