//importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const configs = require('./config');



//

//configurar express
const app = express();

//habilitar pug
app.set('view engine', 'pug');

//Añadir las vistas
app.set('views', path.join(__dirname, './views'));

//cargar una carpeta estatica llamada public
app.use(express.static('public'));

//validar si esta en desarrollo o produccion
const config = configs[app.get('env')];

//creamos la vriable para el sitio
app.locals.titulo = config.nombresitio;

//Muestra el año actual
app.use((req, res, next) => {
    //crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual= fecha.getFullYear();
    return next();
})

//ejecutamos el bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//cargar rutas
app.use('/', routes() );

app.listen(3000);