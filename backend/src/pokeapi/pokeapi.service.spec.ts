import { Test, TestingModule } from '@nestjs/testing';
import { PokeApiService } from './pokeapi.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('PokeApiService', () => {
    let service: PokeApiService;
    let httpService: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PokeApiService,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<PokeApiService>(PokeApiService);
        httpService = module.get<HttpService>(HttpService);
    });

    it('deve retornar os dados formatados do Pokémon quando existir', async () => {
        const mockResponse = {
            data: {
                name: 'pikachu',
                types: [{ type: { name: 'electric' } }],
                sprites: { front_default: 'url_da_sprite' },
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        } as unknown as AxiosResponse;

        jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));


        const result = await service.validatePokemon('pikachu');

        expect(result).toEqual({
            name: 'pikachu',
            types: ['electric'],
            sprite: 'url_da_sprite',
        });

        expect(httpService.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
    });

    it('deve lançar NotFoundException quando Pokémon não existir', async () => {
        jest.spyOn(httpService, 'get').mockReturnValueOnce(throwError(() => new Error('404 Not Found')));

        await expect(service.validatePokemon('invalido')).rejects.toThrowError(
            "Pokemon 'invalido' não encontrado na PokeAPI",
        );
    });
});
