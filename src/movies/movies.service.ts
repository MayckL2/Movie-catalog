import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { MovieEntity } from 'src/db/entities/movie.entity';
import { Iparameters, RouteParameter, typeMovie } from 'src/movies/app.model';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ){}

  // Lista todos os filmes do catalogo, se for passado um parametro é pesquisado os filmes com o respectivo nome
  async listAll(params: Iparameters): Promise<MovieEntity[]> {
    const searchPrams: FindOptionsWhere<MovieEntity> = {}

    if (params.name) {
      searchPrams.name = Like(`%${params.name}%`);
    }

    const tasksFound = await this.movieRepository.find({
      where: searchPrams
    });

    return tasksFound
  }

  // Cadastrar novo filme no catalogo
  async create(movie: typeMovie): Promise<MovieEntity> {
    const movieToSave: MovieEntity = {
      name: movie.name,
      description: movie.description,
      duration: movie.duration,
      classification: movie.classification
    }

    const createdMovie = await this.movieRepository.save(movieToSave)

    return createdMovie
  }

  // Pesquisa o filme pelo Id, se Id não exisir no banco é retornado um erro
  async findById(id: string): Promise<MovieEntity> {
    const foundMovie = await this.movieRepository.findOne({ where: {id} })

    if (!foundMovie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return foundMovie
  }

  // Atualiza dados do filme exceto o Id caso filme for achado no banco
  async update(id: string, movie: typeMovie) {
    let movieIndex = await this.movieRepository.findOne({ where: {id} })

    if (!movieIndex) {
      throw new NotFoundException(`Movie with id ${movie.id} not found`);
    }

    return await this.movieRepository.update(id, this.mapDtoToEntity(movie))
  }

  // Remove filme do catalogo e retorna se remoção for bem sucedida
  async remove(id: string) {
    let result = await this.movieRepository.delete(id)

    if (!result.affected) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return {
      message: "Movie removed from the catalog"
    }
  }

  // Converte objeto typeMovie para entidade MovieEntity
  private mapDtoToEntity(movie: typeMovie): Partial<MovieEntity> {
    return {
      name: movie.name,
      description: movie.description,
      duration: movie.duration,
      classification: movie.classification
    }
  }
}
