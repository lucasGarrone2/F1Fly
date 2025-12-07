import { Component, Inject, OnInit } from '@angular/core';
import { PreguntaF1 } from './preguntas_f1';
import { ReservaClient } from '../../clients/reserva-client'; 
import { GameQuizService } from './game-quiz-service';
import { ToastService } from '../../services/toast-service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "../toast-component/toast-component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  standalone: true, 
  imports: [CommonModule, ToastComponent], 
  templateUrl: './juegos.html',
  styleUrl: './juegos.css'
})
export class Juegos implements OnInit {
  preguntas: PreguntaF1[] = [];
  respuestas: string[] = []; 
  resultado: string | null = null;
  resultadoError: string | null = null;
  
  constructor(
    private quiz: GameQuizService,
    private reservaCliente: ReservaClient,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.preguntas = this.quiz.getRandomQuestions();
    this.respuestas = new Array(this.preguntas.length).fill('');
    this.resultado = null;
    this.resultadoError = null;
  }

  responder(index: number, opcion: string) {
    this.respuestas[index] = opcion;
  }


  juegoCompleto(): boolean {
    return this.respuestas.every(r => r !== '');
  }

  finalizar() {
    
    const respuestasObj: Record<number, string> = Object.assign({}, this.respuestas);
    
    const acertoTodo = this.quiz.verificarRespuestas(this.preguntas, respuestasObj);

    if (acertoTodo) {
      this.reservaCliente.marcarQuizGanado();
      this.reservaCliente.aplicarCupon("QUIZ15");
      this.toast.show("🎉 ¡Felicidades! Cupón: QUIZ15 (15% OFF)");
      this.resultado = "¡Correcto! Descuento aplicado.";
      
      setTimeout(() => {
        this.router.navigateByUrl("/lista-de-carreras")
      }, 3000);

    } else {
      this.resultado = "Alguna respuesta es incorrecta, intentalo nuevamente.";
      this.resultadoError = "❌ Incorrecto. Revisa tus respuestas e intenta de nuevo.";
   
       this.iniciarJuego(); 
    }
  }
}