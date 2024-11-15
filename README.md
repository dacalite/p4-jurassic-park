# 🦖 Jurassic Park - Sistema de Monitoreo y Gestión de Dinosaurios

Este repositorio contiene el sistema de monitoreo reactivo y gestión de dinosaurios para **Jurassic Park**, diseñado para simular y gestionar un ecosistema con poblaciones de dinosaurios en islas específicas, utilizando Spring Boot y WebFlux para manejo eficiente de datos y concurrencia en tiempo real.

## 📋 Descripción

El sistema gestiona la actividad de dinosaurios en distintas islas (voladoras, carnívoras, herbívoras) y un centro de crianza central, donde se controlan factores como el porcentaje de ocupación, reproducción, envejecimiento y alimentación. Se emplea un modelo **reactivo** para procesar eventos de sensores en tiempo real, y un enfoque **productor-consumidor** para coordinar la incubación de dinosaurios desde el centro de crianza a las islas.

El backend maneja toda la lógica reactiva y de concurrencia, mientras que el frontend permite la visualización en tiempo real de métricas y estadísticas sobre el estado de las islas.

## 🎥 Demo del Proyecto

¡Mira una breve demo del proyecto en acción!

https://github.com/user-attachments/assets/a2485634-2c52-4f1e-93bc-227adc7882e7

## 🚀 Tecnologías Utilizadas

### 🌐 **Frontend**:
- **React**: Framework para la creación de interfaces interactivas.
- **Tailwind CSS**: Herramienta de estilos basada en utilidades para lograr un diseño limpio y moderno.
- **Lottie**: Para las animaciones de las fábricas y los flujos de producción, dando vida a las estaciones de trabajo.

### 🔧 **Backend**:
- **Spring Boot**: Framework principal del backend para la gestión de la lógica de negocio.
- **Spring WebFlux**: Soporte para programación reactiva y procesamiento concurrente.
- **Java Concurrent Package**: Utilizado para el modelo de productor-consumidor en el sistema de incubación de dinosaurios.
- **Monitorización en Tiempo Real**: Sensores que registran métricas (movimiento, temperatura, frecuencia cardíaca) y generan alertas de actividad de los dinosaurios.

### 🐳 **Docker**:
- **Docker Compose**: Permite levantar tanto la BBDD como el backend y frontend de manera sencilla y simultánea.

## 🛠️ Ejecición de la aplicación

### 🔧 **Levantar servicios con Docker Compose**
Ejecuta el proyecto completo (BBDD, frontend y backend) desde la raíz del proyecto:

```bash
docker compose up
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)
