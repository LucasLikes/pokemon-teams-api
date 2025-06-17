import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokeApiService {
  constructor(private readonly http: HttpService) {}

  async validatePokemon(pokemonIdOrName: string) {
    try {
      const res = await firstValueFrom(
        this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`),
      );
      return {
        name: res.data.name,
        types: res.data.types.map(t => t.type.name),
        sprite: res.data.sprites.front_default,
      };
    } catch {
      throw new NotFoundException(
        `Pokemon '${pokemonIdOrName}' não encontrado na PokeAPI`,
      );
    }
  }
}
