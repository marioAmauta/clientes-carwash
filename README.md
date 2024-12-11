# Clientes Carwash

## Principales tecnologías usadas en este proyecto

- Lenguaje: <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a>
- Framework: <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>
- Auth: <a href="https://www.better-auth.com/" target="_blank" rel="noopener noreferrer">Better-Auth</a>
- Estilos: <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwindcss</a>
- Base de datos: <a href="https://mongodb.com/" target="_blank" rel="noopener noreferrer">MongoDB</a>
- ORM: <a href="https://www.prisma.io/" target="_blank" rel="noopener noreferrer">Prisma</a>
- Tests E2E: <a href="https://playwright.dev/" target="_blank" rel="noopener noreferrer">Playwright</a>

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

- <a href="https://clientes-carwash.vercel.app/iniciar-sesion?email=hello@hello.com&password=hello123" target="_blank" rel="noopener noreferrer">Demo Usuario Normal</a>
- <a href="https://clientes-carwash.vercel.app/iniciar-sesion?email=marioamauta@hello.com&password=hello123" target="_blank" rel="noopener noreferrer">Demo Usuario Administrador</a>

## Configuración para usar en tu maquina

- Configurar MongoDB ya sea en local o con <a href="https://mongodb.com/atlas" target="_blank" rel="noopener noreferrer">MongoDB Atlas gratis</a>
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
