import { Injectable } from '@angular/core';
import { PREGUNTAS_F1, PreguntaF1 } from './preguntas_f1';

@Injectable({ providedIn: 'root' })
export class GameQuizService {

  getRandomQuestions(): PreguntaF1[] {
    const shuffled = [...PREGUNTAS_F1].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  verificarRespuestas(
    preguntas: PreguntaF1[],
    respuestas: Record<number, string>
  ): boolean {
    return preguntas.every((p, index) => p.answer === respuestas[index]);
  }
}