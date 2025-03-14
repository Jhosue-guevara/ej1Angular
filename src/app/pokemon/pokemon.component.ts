import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  name: string = '';
  allPokemons: any[] = [];
  filteredPokemons: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0').subscribe(
      (response) => {
        // Obtén los detalles de cada Pokémon
        const pokemonRequests = response.results.map((pokemon: any) =>
          this.http.get<any>(pokemon.url).toPromise()
        );

        Promise.all(pokemonRequests).then((pokemonsDetails: any[]) => {
          // Ahora tienes los detalles completos de cada Pokémon
          this.allPokemons = pokemonsDetails;
          this.filteredPokemons = this.allPokemons;
        }).catch(error => {
          this.errorMessage = 'Error al cargar los detalles de los Pokémon.';
          console.error(error);
        });
      },
      (error) => {
        this.errorMessage = 'Error al cargar los Pokémon.';
        console.error(error);
      }
    );
  }

  searchPokemon() {
    if (this.name) {
      this.filteredPokemons = this.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.name.toLowerCase())
      );
    } else {
      this.filteredPokemons = this.allPokemons;
    }
  }
}
