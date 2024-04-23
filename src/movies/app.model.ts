import { IsUUID } from "class-validator";

export class typeMovie {
    id: string;
    name: string;
    description: string;
    duration: number;
    classification: number;
}

export interface Iparameters{
    name: string
}

export class RouteParameter{
    @IsUUID()
    id: string
}