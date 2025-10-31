import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from "./components/login/login";
import { Header } from "./components/header/header";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Home, Login, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('f1Fly');
}
