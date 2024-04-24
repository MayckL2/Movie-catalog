import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponse } from './auth.model';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { typeUser } from 'src/users/user.model';

@ApiTags('users')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    async singIn(@Body() login: typeUser) {
        return await this.authService.signIn(login.username, login.password)
    }
}