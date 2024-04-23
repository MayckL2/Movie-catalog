import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: 'Acesse uma das rotas a abaixo para utilizar a API',
      login: 'localhost:3000/auth/login',
      cadastro: 'localhost:3000/users',
      achar_filme_pelo_id: 'localhost:3000/movies/:id',
      remover_filme_do_catalogo: 'localhost:3000/movies',
      atualizar_dados_de_um_filme: 'localhost:3000/movies/:id',
      listas_todos_os_filmes: 'localhost:3000/movies',
      cadastrar_filme_no_catalogo: 'localhost:3000/movies'
    };
  }
}
