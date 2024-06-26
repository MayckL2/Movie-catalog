import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Iparameters, RouteParameter, typeMovie } from 'src/movies/app.model'
import { MoviesService } from './movies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('movies')
@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async findAll(@Query() params: Iparameters) {
    return await this.movieService.listAll(params);
  }

  @Post()
  async create(@Body() movie: typeMovie) {
    return await this.movieService.create(movie);
  }

  @Get('/:id')
  @ApiParam({name: 'id', required: true, description: 'Insira o id do filme requerido', schema: { oneOf: [{type: 'string'}, {type: 'integer'}]}})
  async findById(@Param('id') id: string) {
    return await this.movieService.findById(id);
  }

  @Put('/:id')
  @ApiParam({name: 'id', required: true, description: 'Insira o id do filme requerido', schema: { oneOf: [{type: 'string'}, {type: 'integer'}]}})
  async update(@Param() params: RouteParameter, @Body() movie: typeMovie){
    return await this.movieService.update(params.id, movie)
  }

  @Delete('/:id')
  @ApiParam({name: 'id', required: true, description: 'Insira o id do filme requerido', schema: { oneOf: [{type: 'string'}, {type: 'integer'}]}})
  async remove(@Param() params: RouteParameter){
    return await this.movieService.remove(params.id)
  }
}
