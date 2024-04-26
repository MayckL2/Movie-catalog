import { ConflictException, Injectable } from '@nestjs/common';
import { typeUser } from './user.model';
import { v4 } from 'uuid';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  // Cadastrar usuarios caso não existir no banco de dados
  async create(newUser: typeUser) {
    const userRegistred = await this.findByUserName(newUser.username);

    if (userRegistred) {
      throw new ConflictException(`User ${newUser.username} already registred`);
    }

    const dbUser = new UserEntity();
    dbUser.username = newUser.username;
    dbUser.password = hashSync(newUser.password, 10);

    const { id, username } = await this.usersRepository.save(dbUser)

    return { id, username }
  }

  // Pesquisa usuario pelo nome e se existir no banco é retornado seus dados
  async findByUserName(username: string): Promise<typeUser | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.password,
    };
  }
}
