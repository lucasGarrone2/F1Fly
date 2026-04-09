# 🏎️ F1Fly - F1 Travel & Management Platform

**F1Fly** es una solución integral para la gestión y reserva de paquetes de viaje para la Fórmula 1. La aplicación permite administrar carreras, hoteles y vuelos, ofreciendo una experiencia de usuario fluida desde la autenticación hasta la confirmación de la reserva.

Este proyecto demuestra habilidades en el desarrollo de aplicaciones empresariales escalables, manejo de estados dinámicos y validaciones complejas.

---

## 🚀 Funcionalidades Principales

* **Gestión Administrativa (CRUD):** Panel completo para la administración de carreras, plazas hoteleras y disponibilidad de vuelos.
* **Sistema de Reservas Inteligente:** Flujo dinámico que integra la selección de carrera + hotel + vuelo en una sola transacción.
* **Autenticación y Seguridad:** Módulo de login y registro de usuarios para acceso personalizado.
* **Experiencia de Usuario (UX/UI):** * Diseño **fully responsive** (Desktop/Mobile).
    * Feedback visual mediante animaciones y notificaciones personalizadas.
    * Confirmación de reserva con integración de audio y transiciones.
* **Validaciones Avanzadas:** Control estricto de formularios para garantizar la integridad de los datos de reserva.

## 🛠️ Stack Tecnológico

* **Frontend:** [Angular](https://angular.io/) (v19+) con **TypeScript**.
* **Estilos:** **CSS3** avanzado con enfoque en diseño responsivo y animaciones.
* **Backend (Simulado):** **JSON-Server** para una gestión ágil de APIs REST durante el desarrollo.
* **Herramientas:** Angular CLI para scaffolding y optimización de builds.

---

## 📐 Arquitectura de la Solución

El proyecto sigue las mejores prácticas de Angular:
- **Servicios:** Centralización de la lógica de negocio y llamadas a API.
- **Guardias (Guards):** Protección de rutas para usuarios no autenticados.
- **Componentización:** Estructura modular para facilitar el mantenimiento y la escalabilidad.

---

## 💻 Instalación y Uso

Para correr este proyecto localmente, seguí estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/lucasGarrone2/f1fly.git]
Instalar dependencias:

Bash
npm install
Levantar el Servidor de Desarrollo:

Bash
ng serve
Navega a http://localhost:4200/. La aplicación se recargará automáticamente ante cualquier cambio.

Levantar el Backend (JSON-Server):
(Asegúrate de tener configurado tu db.json)

Bash
json-server --watch db.json
