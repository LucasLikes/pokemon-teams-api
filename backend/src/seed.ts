import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppDataSource } from './data.source';
import { Trainer } from './trainers/entities/trainer.entity';
import { Team } from './teams/entities/team.entity';
import { TeamPokemon } from './team-pokemons/entities/team-pokemon.entity';

async function runSeed() {
  await AppDataSource.initialize();

  console.log('Conexão com o banco estabelecida.');

  // Criar Trainer
  const trainerRepo = AppDataSource.getRepository(Trainer);
  const trainer = trainerRepo.create({
    name: 'Ash Ketchum',
    city: 'Pallet Town',
  });
  await trainerRepo.save(trainer);
  console.log('Trainer criado:', trainer);

  // Criar Team
  const teamRepo = AppDataSource.getRepository(Team);
  const team = teamRepo.create({
    name: 'Time Inicial de Ash',
    trainer: trainer,
  });
  await teamRepo.save(team);
  console.log('Team criado:', team);

  // Add TeamPokemons
  const teamPokemonRepo = AppDataSource.getRepository(TeamPokemon);
  const pokemons = ['pikachu', 'bulbasaur'];

  for (const pokemon of pokemons) {
    const teamPokemon = teamPokemonRepo.create({
      team: team,
      pokemonIdentifier: pokemon,
    });
    await teamPokemonRepo.save(teamPokemon);
    console.log(`Pokemon adicionado ao time: ${pokemon}`);
  }

  console.log('Seed finalizado com sucesso.');

  process.exit(0);
}

runSeed().catch((error) => {
  console.error(' Erro ao rodar seed:', error);
  process.exit(1);
});
