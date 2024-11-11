## AGENDA TU SEMANA

Este proyecto inicio como mejora de uno hecho con JavaScript vanilla, en el cual además de agregar más features se mejoro otros aspectos de validacion de datos. Aunque aun simple, en el se implementan muchos de los conocimientos de un Fron-End Junior.

Esta hecho con NextJS por lo que al instalar el repositorio los comandos para que funcione van a ser los siguientes:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Además tiene otras dependencias para su funcionamiento, como por ejemplo el framework de componentes ChackraUI, port lo que cuando inicies el proyecto deberás hacer un `npm install`

Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver los resultados.

## Intuitivo
Crea un usuario, entra, y ponte a escribir tareas. Cuando entres de nuevo no deberás registrarte.
![Un pequeño tour por la app](/src/assets/so-easy-to-use "Pequeño tour por la app")

## Funcionamiento y features

- Base de datos: Se guardan todos las tasks en una base de datos de `firebase` y luego se recuperan segun su creador (email de login).
- Puedes `crear`, `borrar` y `editar` las tareas, como también de `marcarlas como completas`.
- `Ordenar por` fecha o por orden alfabético tus tareas.

