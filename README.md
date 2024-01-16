# Aplicación Web de Amigos Académicos IS - Frontend

Este repositorio contiene el código Front-end de la "Aplicación Web de Amigos Académicos IS". El objetivo principal de este proyecto es mejorar la gestión del programa de amigos académicos para evitar la deserción de los estudiantes de la carrera de ingeniería de sistemas.




![Logo](https://i.imgur.com/oMQyS8H.png)


## Instalación

Luego de clonar el repositorio y abrir un terminal en la carpeta contenedora del proyecto amigos-academicos-front debemos instalar las dependencias del projecto, para ello usamos el comando:

```bash
  npm install
```
Luego de esto se nos intalarán todas las dependencias necesarias para que nuestra aplicación pueda funcionar, las cuales se pueden encontrar en el archivo package.json.

## Estructura del proyecto

```───src 
    │ 
    ├─ app 
    │   │
    │   ├─ core 
    │   │   ├─ auth 
    │   │   │   └─ login 
    │   │   │
    │   │   ├─ guards 
    │   │   │
    │   │   ├─ header 
    │   │   │
    │   │   ├─ interceptors 
    │   │   │
    │   │   ├─ services 
    │   │   │   ├─ auth 
    │   │   │   └─ core 
    │   │   │
    │   │   ├─ sidebar 
    │   │   │
    │   │   └─ utils 
    │   │       ├─ metadata 
    │   │       └─ models 
    │   │
    │   ├─ layouts 
    │   │   └─ main 
    │   │
    │   ├─ modules 
    │   │   │   app-modules.module.ts 
    │   │   │
    │   │   ├─ metadata 
    │   │   │   ├─ academic-friend 
    │   │   │   ├─ consultancy 
    │   │   │   ├─ convocation 
    │   │   │   ├─ enrollment-academic-friend 
    │   │   │   ├─ register-coordinator 
    │   │   │   ├─ schedule-assignment 
    │   │   │   ├─ upload-courses 
    │   │   │   ├─ upload-report 
    │   │   │   └─ upload-students 
    │   │   │
    │   │   ├─ models 
    │   │   │
    │   │   ├─ services 
    │   │   │   ├─ academic-friends 
    │   │   │   ├─ consultancy 
    │   │   │   ├─ convocation 
    │   │   │   ├─ coordinator 
    │   │   │   ├─ courses 
    │   │   │   ├─ enrollment 
    │   │   │   ├─ file 
    │   │   │   ├─ report 
    │   │   │   ├─ schedule 
    │   │   │   └─ students 
    │   │   │
    │   │   └─ views 
    │   │       ├─ academic-friends 
    │   │       ├─ calendar 
    │   │       ├─ consultancy-list 
    │   │       ├─ consultancy-save 
    │   │       ├─ convocation-approvals 
    │   │       ├─ convocation-consult 
    │   │       ├─ convocation-create 
    │   │       ├─ enrollment-academic-friend 
    │   │       ├─ home 
    │   │       ├─ profile 
    │   │       ├─ register-coordinator 
    │   │       ├─ review-report 
    │   │       ├─ schedule-assignment 
    │   │       ├─ stats 
    │   │       ├─ upload-courses 
    │   │       ├─ upload-report 
    │   │       └─ upload-students 
    │   │
    │   └─ shared 
    │       │   shared.module.ts 
    │       │
    │       ├─ components 
    │       │   ├─ academic-friend-card 
    │       │   ├─ dinamic-dialog 
    │       │   ├─ dinamic-form 
    │       │   ├─ dinamic-table 
    │       │   ├─ page-not-found 
    │       │   ├─ report-card 
    │       │   └─ stats-card 
    │       │
    │       ├─ models 
    │       │
    │       └─ services 
    │           └─ dialog 
    │
    ├─ assets 
    │
    └─ environments
```
Directorio **src>app>core**

Directorio que contiene el código que implementa las funcionalidades fundamentales de la aplicación, cómo lo son, el servicio de autenticacion **services>auth** para poder iniciar, cerrar sesión y validar usuarios, el servicio core **services>core** que nos permite tener un control de sidenav a modo de mantener el estado de este y poder ejecutar mensajes atravez de todo el aplicativo que nos informarán el estado de este mismo cuando se ejecuten funciones o se consuman servicios, el componente **header** mantiene la funcionalida de la barra superior que se muestra en el aplicativo donde contiene el boton para desplegar el componente sidebar y demás funciones cómo la vista de perfil y el boton de cerrar sesión, el modulo de login **auth>login** que crea toda la vista del formulario para ingresar al aplicativo y consume los servicios de auth y core, el componente **sidebar** es el encargado de mostrar una barra lateral que puede esconderse donde se alojaran los enlaces para navegar en las determinadas vistas del aplicativo, **utils** contiene los modelos y archivos de metadata que se utilizan en todo el modulo core

Directorio **src>app>layouts**

Directorio que mantiene componentizado el layout principal de la aplicación donde se integran el header con el sidebar y el router de angular para poder navegar por el aplicativo y compartir información entre componentes

Directorio **src>app>modules**

Directorio donde se definen las diferentes vistas y su lógica dentro del aplicativo así mismo con sus servicios modelos y metadata 

Directorio **src>app>shared**

Directorio donde se almacenan todos los componentes que tienen un comportamiento dinámico o que pueden ser usados o compartidos por 2 o más vistas cómo los es nuestro formulario dinamico, tabla dinámica, modal dinámico, tarjetas de informes y nuestra página de 404

Directorio **src>assets**

Directorio donde se almacenan todas las imagenes y archivos multimedia que utilizamos en el aplicativo

Directorio **src>environments**

Directorio que contiene la configuración de variables de entorno del aplicativo para cuando se requiera despliegue en local o en ambiente productivo

## Configuración variables de entorno

dentro del directorio **src>environments** 

se encuentran 2 archivos
```
└───environments
            environment.prod.ts
            environment.ts
```
los cuales tienen la misma  estructura interiormente:
```
export const environment = {
    production: false,
    url: 'http://...../ufps/academic-friends-api'
  };
```
en la cual varía la propiedad production el cual cuando se despliegue este tendrá un valor de true y cuando esté en local será de false

la propiedad url almacenará la url del host de nuestro backend con el que estableceremos consumos de servicios

##Cómo ejecutar la aplicación localmente

luego de instalar las dependencias en los primeros pasos, se debe ejecutar el siguiente comando:
```
ng serve
```
comando el cual nos ayudará a levantar nuestra aplicación en el puerto 4200 y así ya tendríamos nuestra aplicación corriendo

## Uso y funcionalidades ##

La aplicación web de Amigos Académicos IS proporciona las siguientes funcionalidades:

- Registro de usuarios: Los estudiantes y los amigos académicos pueden registrarse en el sistema.
- Creación de convocatorias: Los coordinadores pueden crear convocatorias para que los estudiantes se inscriban.
- Registro de sesiones de asesoría: Los amigos académicos pueden registrar las sesiones de asesoría que realizan con los
  estudiantes.
- Visualización de estadísticas: Los coordinadores pueden ver estadísticas sobre las sesiones de asesoría realizadas.
- Registro de informes: Los amigos académicos pueden registrar informes sobre las sesiones de asesoría que realizan con
  los estudiantes.



    ## Contribución ##

Cualquier contribución al proyecto es bienvenida. Si deseas informar un error, solicitar una nueva funcionalidad o
contribuir con código, sigue estos pasos:

1. Crea un fork de este repositorio.
2. Crea una nueva rama con un nombre descriptivo.
3. Haz los cambios necesarios en esa rama.
4. Envía un pull request con una descripción clara y concisa de los cambios realizados.

## Licencia ##

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más información.

## Contacto ##

Si tienes alguna pregunta o comentario sobre el proyecto, puedes contactarme a través de mi correo electrónico.

