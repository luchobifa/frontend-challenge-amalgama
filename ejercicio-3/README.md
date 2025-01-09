# Ejercicio 3 - Práctica

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tuusuario/frontend-challenge-amalgama.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd ejercicio-3
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

   La aplicación estará disponible en `http://localhost:3000`.

## Funcionalidad

### Rutas

- `/login`: Formulario para que los usuarios ingresen sus credenciales.
- `/dashboard`: Área protegida que solo puede ser accedida si el usuario está autenticado.

### Autenticación

- El contexto de autenticación (`AuthContext`) gestiona el estado de si el usuario está autenticado o no.
- Si un token de autenticación está presente en el almacenamiento local, el usuario se considera autenticado.
- Si el usuario intenta acceder a una ruta protegida sin autenticarse, será redirigido a la página de login.

### Componente de Login

El formulario de login permite a los usuarios ingresar su correo electrónico y contraseña. Si las credenciales son correctas, el usuario será redirigido al dashboard. De lo contrario, verá un mensaje de error.

### Rutas Protegidas

La ruta `/dashboard` está protegida por el componente `ProtectedRoute`, que verifica si el usuario está autenticado antes de permitir el acceso. Si no está autenticado, el usuario es redirigido al formulario de login.

## Características

- **Login**: El usuario puede iniciar sesión con su correo electrónico y contraseña.
- **Autenticación persistente**: El token de autenticación se guarda en el almacenamiento local y se mantiene durante la sesión.
- **Protección de rutas**: La ruta `/dashboard` está protegida y solo accesible si el usuario está autenticado.
