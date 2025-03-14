import { bootstrapApplication } from '@angular/platform-browser';
import { PokemonComponent } from './app/pokemon/pokemon.component'; // Importa el nuevo componente
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient para la configuración de HttpClient

// Arranca la aplicación con el componente PokemonComponent y proporciona HttpClientModule
bootstrapApplication(PokemonComponent, {
  providers: [
    provideHttpClient() // Añadimos el provider de HttpClient
  ]
}).catch((err) => console.error(err));
