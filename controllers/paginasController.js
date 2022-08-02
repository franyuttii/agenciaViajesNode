import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimonial.js';


const paginaInicio = async (req, res) => { 
    //Consultar 3 viajes del modelo Viaje 
    const promiseDb = []; 
    promiseDb.push(Viaje.findAll({ limit: 3 }));
    promiseDb.push(Testimonial.findAll({ limit: 3 }));
    try {
        const resultado = await Promise.all(promiseDb);
            //get es cuando visitas una URL
            //req - lo que enviamos: res - lo que express nos responde
            res.render('inicio', {
                pagina: 'Inicio',
                clase: 'home',
                viajes: resultado[0],
                testimoniales: resultado[1]
            });
    } catch (error) {
        console.log(error);
    }
};

const paginaNosotros = (req, res) => { //req - lo que enviamos: res - lo que express nos responde
    const viajes = 'Viaje a Alemania';
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {
    //Consultar la Base de Datos
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    })
}; 

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }); 
    } catch (error) {
        console.log(error);
    }
}; 

//Muestra un viaje por su slug

const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where: { slug }});
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch(err) {
        console.log(err);
    }

};

export {
    paginaInicio, 
    paginaNosotros,
    paginaViajes, 
    paginaTestimoniales, 
    paginaDetalleViaje
}