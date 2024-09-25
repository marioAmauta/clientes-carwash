# Clientes Carwash

## Principales tecnologías usadas en este proyecto

- Lenguaje: [TypeScript](https://www.typescriptlang.org/)
- Framework: [Next.js](https://nextjs.org/)
- Auth: [Lucia](https://lucia-auth.com/)
- Estilos: [Tailwindcss](https://tailwindcss.com/)
- Base de datos: [MongoDB](https://mongodb.com/)
- ORM: [Prisma](https://www.prisma.io/)
- Tests E2E: [Playwright](https://playwright.dev/)

## ¿El por qué?

Trabajar en un lavado de autos se resume en un sueldo fijo y propinas de los clientes, entonces por esa misma razón he creado esta app para que así el lavador de autos pueda tener un registro de sus mejores clientes y/o los peores, y así de esta manera poder optimizar su tiempo y energías para poder hacer mejores propinas.

## ¿Qué hace la app?

### La app permite al lavador de autos:

_El ingreso a la app es en base a invitación ya que es privada solo para los lavadores de autos y no abierta a todo publico._

- Crear una cuenta para poder agregar, editar, eliminar sus clientes y sus respectivas propinas.
- Buscar clientes existentes y en el caso de que no exista, le da la opción de poder crearlo.
- Ver listas de propinas y clientes con opciones de ordenamiento por fecha y monto de propina.
- Tener una pagina de perfil donde ver sus propinas o clientes creado por el usuario.

En el caso del usuario administrador.

- Sección para crear invitaciones y también una lista con todas las invitaciones creadas para poder ser gestionadas.

## Links del demo de la app

- [Demo Usuario Normal](https://mongodb.com/atlas)
- [Demo Usuario Administrador](https://mongodb.com/atlas)

## Configuración para usar en tu maquina

- Configurar MongoDB ya sea en local o con [MongoDB Atlas gratis](https://mongodb.com/atlas).
- Configurar la variable de entorno `DATABASE_URL` con la cadena de texto de conexión de MongoDB
- Configurar la variable de entorno `SITE_TITLE` para darle el nombre que desees al proyecto, por defecto el nombre de la app es "Clientes Carwash"

### Ejecutar Next.js en modo de desarrollo

```bash
npm install
npm run dev
```

### Ejecutar Tests de Playwright

```bash
npm run build && npm run start

# y en otra pestaña de terminal después de que se construya la app y se este ejecutando en modo de producción
npm test:ui
```
