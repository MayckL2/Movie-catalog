import { ApiProperty } from "@nestjs/swagger";

export class typeUser{
    id: string;

    @ApiProperty({
        description: 'Nome do usuario, usado para o login',
        example: 'will smith'
    })
    username: string;
    
    @ApiProperty({
        description: 'Senha do usuario, usado tambem para o login',
        example: '1234'
    })
    password: string;
}