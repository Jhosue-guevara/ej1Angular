import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importa el CommonModule
import { FormsModule } from '@angular/forms'; // Importa el FormsModule

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Asegúrate de agregar estos módulos
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {
  name: string = '';
  pokemon: any;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  searchPokemon() {
    if (this.name.trim() !== '') {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.name.toLowerCase()}`)
        .subscribe(
          (data) => {
            this.pokemon = data;
            this.errorMessage = '';
          },
          (error) => {
            this.pokemon = null;
            this.errorMessage = 'Pokémon no encontrado. Intenta de nuevo.';
          }
        );
    }
  }
}
