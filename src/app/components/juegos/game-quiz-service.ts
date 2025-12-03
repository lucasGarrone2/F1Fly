import { Injectable } from '@angular/core';
import {  PREGUNTAS_GENERALES, PreguntaF1 } from './preguntas_f1';
import { NOMBRES_CIRCUITOS, OUTLINES_CIRCUITOS } from './outlines-circuitos';

@Injectable({ providedIn: 'root' })
export class GameQuizService {

  private readonly num_preguntas= 3;
  private readonly max_opciones_circuitos= 4;

 private generateCircuitQuestion(): PreguntaF1 {
    
    const respuestaCorrecta = NOMBRES_CIRCUITOS[Math.floor(Math.random() * NOMBRES_CIRCUITOS.length)];
    const imageUrl = OUTLINES_CIRCUITOS[respuestaCorrecta];

  
    const opcionesIncorrectas: string[] = NOMBRES_CIRCUITOS
      .filter(name => name !== respuestaCorrecta)
      .sort(() => Math.random() - 0.5)
      .slice(0, this.max_opciones_circuitos - 1); 


    const options = [respuestaCorrecta, ...opcionesIncorrectas].sort(() => Math.random() - 0.5);

    return {
      question: "¿A qué circuito de Fórmula 1 pertenece este trazado?",
      options: options,
      answer: respuestaCorrecta,
      category: "circuito",
      imageUrl: imageUrl
    };
  }



  getRandomQuestions(): PreguntaF1[] {
    const preguntasFinales: PreguntaF1[] = [];
    
    
    const numCircuitos = 1;
    const numGenerales = this.num_preguntas - numCircuitos;

    const shuffledGenerales = [...PREGUNTAS_GENERALES].sort(() => Math.random() - 0.5);
    preguntasFinales.push(...shuffledGenerales.slice(0, numGenerales));

 
    for (let i = 0; i < numCircuitos; i++) {
        preguntasFinales.push(this.generateCircuitQuestion());
    }
    

    return preguntasFinales.sort(() => Math.random() - 0.5);
  }

  verificarRespuestas(
    preguntas: PreguntaF1[],
    respuestas: Record<number, string>
  ): boolean {
    return preguntas.every((p, index) => p.answer === respuestas[index]);
  }
}