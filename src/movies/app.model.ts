import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class typeMovie {
    id: string;
    @ApiProperty({
        description: 'Nome do filme',
        example: 'Avatar'
    })
    name: string;
    
    @ApiProperty({
        description: 'Descrição do filme, sinopse básica',
        example: 'Aliens azuis'
    })
    description: string;
    
    @ApiProperty({
        description: 'Duração do filme em horas',
        example: '2'
    })
    duration: number;
    
    @ApiProperty({
        description: 'Idade minima para assistir o filme, se 0 a classificação é livre',
        example: '12'
    })
    classification: number;
}

export interface Iparameters{
    name: string
}

export class RouteParameter{
    @IsUUID()
    id: string
}