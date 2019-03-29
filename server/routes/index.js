const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');
//const Testimonial = require('../models/Testimoniales');


module.exports = function() {
    router.get('/', (req, res) => {
        res.render('index');
    });
    
    router.get('/nosotros', (req, res) => {
        res.render('Nosotros', {
            pagina: 'Sobre Nosotros'
        });
    });

    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes', {
                pagina: 'Próximos Viajes',
                viajes
            }))
            .catch(error => console.log(error))
    });

    router.get('/viajes/:id', (req, res) => {
        Viaje.findById(req.params.id)
            .then(viaje => res.render('viaje', {viaje
            }))
            .catch(error => console.log(error));
    });

    router.get('/testimoniales', (req, res) => {
        res.render('Testimoniales', {
            pagina: 'Testimoniales'
        });

    });

    router.post('/testimoniales', (req, res) => {
        //Validar que todos los campos estén llenos
        let{nombre, correo, mensaje} = req.body;

        let errores = [];
        if(!nombre){
            errores.push({'mensaje' : 'Agrega tu Nombre'})
        }
        if(!correo){
            errores.push({'mensaje' : 'Agrega tu correo'})
        }
        if(!mensaje){
            errores.push({'mensaje' : 'Agrega tu mensaje'})
        }

        //revisar por errores
        if(errores.length > 0) {
            //muestra la vista con errores
            res.render('testimoniales', {
                errores,
                nombre,
                correo,
                mensaje
            })
        } else {
            // almacenarlo en la BD
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            .then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error));
        }
    })

    return router;

}