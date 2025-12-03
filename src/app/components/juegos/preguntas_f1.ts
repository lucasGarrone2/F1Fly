export interface PreguntaF1 {
  question: string;
  options: string[];
  answer: string;
  category: "general" | "circuito",
  imageUrl?: string
}

export const PREGUNTAS_GENERALES : PreguntaF1[]= [
 
  {
    question: "¿Cuántos puntos recibe el ganador de una carrera?",
    options: ["25", "20", "15", "30"],
    answer: "25",
    category: "general"
  },
  {
    question: "¿Cuántos pilotos compiten normalmente en un Gran Premio?",
    options: ["20", "22", "18", "24"],
    answer: "20",
    category: "general"
  },
  {
    question: "¿Cuántos equipos hay actualmente en la Fórmula 1?(2025)",
    options: ["10", "12", "8", "11"],
    answer: "10",
    category: "general"
  },
  {
    question: "¿Qué significa DRS?",
    options: [
      "Drag Reduction System",
      "Downforce Reactive System",
      "Drive Response Setup",
      "Dynamic Rear System"
    ],
    answer: "Drag Reduction System",
    category: "general"
  },
  {
    question: "¿Cuántos puntos suma la vuelta rápida?",
    options: ["1", "2", "3", "5"],
    answer: "1",
    category: "general"
  },
  {
    question: "¿Qué color tiene la bandera que marca el final de la carrera?",
    options: ["A cuadros", "Blanca", "Amarilla", "Verde"],
    answer: "A cuadros",
    category: "general"
  },
  {
    question: "¿Qué bandera se usa cuando hay peligro en pista?",
    options: ["Amarilla", "Roja", "Negra", "Verde"],
    answer: "Amarilla",
    category: "general"
  },
  {
    question: "¿Cuál de estas no es un neumático de F1?",
    options: ["UltraSoft", "Soft", "Hard", "DryGrip"],
    answer: "DryGrip",
    category: "general"
  },
  {
    question: "¿En qué sesión se define la grilla de largada?",
    options: ["Clasificación", "Práctica 3", "Sprint", "Warm up"],
    answer: "Clasificación",
    category: "general"
  },
  {
    question: "¿Qué componente tiene límites de unidades por temporada?",
    options: ["Motor", "Caja de cambios", "Frenos", "MGU-K"],
    answer: "MGU-K",
    category: "general"
  },
  {
    question: "¿Qué tipo de motor usa la F1 moderna?",
    options: ["Híbrido V6", "V8", "V10", "V12"],
    answer: "Híbrido V6",
    category: "general"
  },
  {
    question: "¿Qué significa SC?",
    options: ["Safety Car", "Speed Control", "Sector Control", "Steering Command"],
    answer: "Safety Car",
    category: "general"
  },
  {
    question: "¿Cuántos pilotos suben al podio?",
    options: ["3", "5", "2", "4"],
    answer: "3",
    category: "general"
  },
  {
    question: "¿Cómo se llama el sistema de protección alrededor de la cabeza?",
    options: ["Halo", "Shield", "Arc", "Aro protector"],
    answer: "Halo",
    category: "general"
  },
  {
    question: "¿Qué ciudad alberga el GP nocturno más famoso?",
    options: ["Singapur", "Las Vegas", "Abu Dabi", "Sakhir"],
    answer: "Singapur",
    category: "general"
  },
  {
    question: "¿Cuál es el circuito más largo del calendario moderno?",
    options: ["Spa-Francorchamps", "Baku", "Suzuka", "Silverstone"],
    answer: "Spa-Francorchamps",
    category: "general"
  },
  {
    question: "¿Qué carrera es conocida como 'La catedral de la velocidad'?",
    options: ["Monza", "Silverstone", "Interlagos", "Suzuka"],
    answer: "Monza",
    category: "general"
  },
  {
    question: "¿Qué fabricante provee neumáticos a la F1?",
    options: ["Pirelli", "Michelin", "Bridgestone", "Goodyear"],
    answer: "Pirelli",
    category: "general"
  },
  {
    question: "¿Qué piloto argentino compite actualmente en F1?",
    options: ["Franco Colapinto", "Esteban Tuero", "Pechito López", "Nadie"],
    answer: "Franco Colapinto",
    category: "general"
  },
  {
    question: "¿Qué circuito tiene un túnel en el sector 1?",
    options: ["Mónaco", "Jeddah", "Las Vegas", "Miami"],
    answer: "Mónaco",
    category: "general"
  },
];
