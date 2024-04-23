import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { typeUser } from './user.model';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    create(@Body() newUser: typeUser){
        this.userService.create(newUser)
    }
}
