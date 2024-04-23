import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponse } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singIn(
        @Body('username') username: string,
        @Body('password') password: string
    ): Promise<AuthResponse> {
        return await this.authService.signIn(username, password)
    }
}
