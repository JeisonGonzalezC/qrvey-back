## Available Scripts

Para instalar las dependencias del packages.json
### `npm install`
o
### `yarn install`

Para iniciar el proyecto
### `npm start`
o
### `yarn start`

Crear un archivo .env en la raíz del proyecto y agregar las siguientes variables de entorno
DB_CONNECTION="mongodb://localhost/test_qrvey"
PORT="3005"

Funcionamiento:
El proyecto cuenta con los endpoints principaales de una API
### STORE --> PARA GUARDAR LA DATA
### INDEX --> PARA MOSTRAR UN LISTADA DE LA DATA
### SHOW --> PARA CONULTAR UN DATO POR ID
### UPDATE --> PARA ACTUALIZAR UN DATO POR ID
### DELETE --> PARA ELIMINAR UN DATO POR ID

Además cuenta con una función excel, para descargar a excel un listado de personas 
que se encuentran registrados en la base de datos

La aplicación además cuenta con pruebas unittarias  y de integración, donde se pueba por separado
algunas funcionalidades principalmente de los modelos que es donde recae las consiltas a la base 
de datos, y esas mismas funcionalides se prueban en conjunto.

Las pruebas sobre los controladores no se realizaron ya que el controlador esta sirviendo solo de puente para la llegada del request y para la respuesta de los modelos.

La acción del PDF  no se desarrollo al no tener disponile ayuda del front para renderizar en HTML
La data que se debe cargar en el PDF.

Los Métodos se encuentran documentados con lo que se debe recibir y la respuesta que se espera.
De todas formas se uso Typescript para un mayor tipado de los datos y poder tener mucha
mayor legilibilidad al leer el código.

En la raíz del proyecto hay un archivo llamado
### Qrvey.postman_collection.json
Que tiene la documentación de POSTMAN que se uso para las pruebas de la API