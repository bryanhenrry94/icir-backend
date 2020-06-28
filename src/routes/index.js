const { Router } = require('express');
const router = Router();

const Usuario = require('../models/Usuario');
const Iglesia = require('../models/Iglesia');
const Caja = require('../models/Caja');
const Persona = require('../models/Persona');
const TipoMovimiento = require('../models/TipoMovimiento');
const MovimientoCaja = require('../models/MovimientoCaja')

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('Hola bienvenido a mi api rest');
})


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'SECRECT_KEY')
        const user = await Usuario.findOne({ _id: decoded._id }) //'tokens.token': token

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

router.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    const user = await Usuario.findOne({usuario: usuario});

    if(!user) return res.status(401).json("El usuario no existe");
    if(user.contrasena != contrasena) return res.status(401).json("Password incorrecta!");

    const token = jwt.sign({_id: user._id}, "SECRECT_KEY");

    // let cont = 0;
    // for(var i = 0; i < 9999999999; i++){
    //     cont+=i;
    // }
    // console.log(cont);

    const userAuth = {
        usuario: user.usuario,
        nombre: user.nombre,
        email: user.email,
        token: token
    }

    res.status(200).send(JSON.stringify(userAuth));
})

//******************* USUARIOS **********************//

router.post('/usuarios', auth, async (req, res) => {    
    console.log(req.body);

    const newUser = new Usuario(
        { 
            usuario: req.body.usuario, 
            contrasena: req.body.contrasena,
            nombre: req.body.nombre, 
            email: req.body.email,
            perfil: req.body.perfil            
        });

    await newUser.save();

    res.status(200).send(JSON.stringify(newUser));
})

router.get('/usuarios', auth, async (req, res) => {
    const users = await Usuario.find();

    res.status(200).send(JSON.stringify(users));
})

router.get('/usuarios/:id', auth, async (req, res) => {
    const user = await Usuario.findOne({_id: req.params.id});

    res.status(200).send(JSON.stringify(user));
})

router.put('/usuarios/:id', auth, async (req, res) => {
    const user = await Usuario.findOne({_id: req.params.id});
    
    if(user!=null){
        user.nombre = req.body.nombre;
        user.email = req.body.email;
        user.perfil = req.body.perfil;
        user.contrasena = req.body.contrasena;
        user.save();
    }
    
    res.status(200).send(JSON.stringify(user));
})

router.delete('/usuarios/:id', auth, async (req, res) => {
    const irow = await Usuario.findOneAndRemove({"_id" : req.params.id});
    
    console.log(irow);

    res.status(200).send( {mensaje: 'usuario eliminado con éxito!'});
})

//******************* IGLESIAS **********************//

router.post('/iglesias', auth, async (req, res) => {    
    const newIglesia = new Iglesia(
        {             
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            direccion: req.body.direccion,
            codigo_postal: req.body.codigo_postal,
            fecha_creacion: req.body.fecha_creacion,
            pastor: req.body.pastor,
            email: req.body.email,
            telefono: req.body.telefono,
            whatsapp: req.body.whatsapp,
            website: req.body.website,
            facebook: req.body.facebook
        });

    await newIglesia.save();

    res.status(200).send(JSON.stringify(newIglesia));
})

router.get('/iglesias', auth, async (req, res) => {
    const iglesias = await Iglesia.find();

    res.status(200).send(JSON.stringify(iglesias));
})

router.get('/iglesias/:id', auth, async (req, res) => {
    const iglesia = await Iglesia.findOne({_id: req.params.id});

    res.status(200).send(JSON.stringify(iglesia));
})

router.put('/iglesias/:id', auth, async (req, res) => {
    const iglesia = await Iglesia.findOne({_id: req.params.id});
    
    if(iglesia!=null){
        iglesia.nombre = req.body.nombre,
        iglesia.codigo = req.body.codigo,
        iglesia.direccion = req.body.direccion,
        iglesia.codigo_postal = req.body.codigo_postal,
        iglesia.fecha_creacion = req.body.fecha_creacion,
        iglesia.pastor = req.body.pastor,
        iglesia.email = req.body.email,
        iglesia.telefono = req.body.telefono,
        iglesia.whatsapp = req.body.whatsapp,
        iglesia.website = req.body.website,
        iglesia.facebook = req.body.facebook
        iglesia.save();
    }
    
    res.status(200).send(JSON.stringify(Iglesia));
})

router.delete('/iglesias/:id', auth, async (req, res) => {
    const irow = await Iglesia.findOneAndRemove({"_id" : req.params.id});
    
    console.log(irow);

    res.status(200).send( {mensaje: 'iglesia eliminada con éxito!'});
})


//******************* CAJAS **********************//

router.post('/cajas', auth, async (req, res) => {        
    const newCaja = new Caja(
        {       
            iglesia: {
                _id: req.body.iglesia._id,
                nombre: req.body.iglesia.nombre,                
                codigo: req.body.iglesia.codigo,
                direccion: req.body.iglesia.direccion,
                codigo_postal: req.body.iglesia.codigo_postal,
                fecha_creacion: req.body.iglesia.fecha_creacion,
                pastor:req.body.iglesia.pastor,
                email: req.body.iglesia.email,
                telefono: req.body.iglesia.telefono,
                whatsapp: req.body.iglesia.whatsapp,
                website: req.body.iglesia.website,
                facebook: req.body.iglesia.facebook
            },  
            responsable: {
                _id: req.body.responsable._id,
                usuario: req.body.responsable.usuario,
                contrasena: req.body.responsable.contrasena,
                nombre: req.body.responsable.nombre,
                email: req.body.responsable.email,
                perfil: req.body.responsable.perfil
            },    
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            moneda: req.body.moneda,
            estado: req.body.estado
        });

    await newCaja.save();

    res.status(200).send(JSON.stringify(newCaja));
})


router.get('/cajas', auth, async (req, res) => {
    const caja = await Caja.find();

    res.status(200).send(JSON.stringify(caja));
})

router.get('/cajas/iglesia/:id', auth, async (req, res) => {
    const caja = await Caja.find({ 'iglesia._id' : req.params.id});

    res.status(200).send(JSON.stringify(caja));
})

router.get('/cajas/:id', auth, async (req, res) => {
    const caja = await Caja.findOne({_id: req.params.id});

    res.status(200).send(JSON.stringify(caja));
})

router.put('/cajas/:id', auth, async (req, res) => {
    const caja = await Caja.findOne({_id: req.params.id});
    
    if(caja!=null){
        caja.iglesia._id = req.body.iglesia._id;        
        caja.iglesia.nombre = req.body.iglesia.nombre;
        caja.iglesia.codigo = req.body.iglesia.codigo;
        caja.iglesia.direccion = req.body.iglesia.direccion;
        caja.iglesia.codigo_postal = req.body.iglesia.codigo_postal;
        caja.iglesia.fecha_creacion = req.body.iglesia.fecha_creacion;
        caja.iglesia.pastor = req.body.iglesia.pastor;
        caja.iglesia.email = req.body.iglesia.email;            
        caja.iglesia.telefono = req.body.iglesia.telefono;
        caja.iglesia.whatsapp = req.body.iglesia.whatsapp;
        caja.iglesia.website = req.body.iglesia.website;
        caja.iglesia.facebook = req.body.iglesia.facebook;
        caja.codigo = req.body.codigo;
        caja.nombre = req.body.nombre;
        caja.moneda = req.body.moneda;
        caja.responsable._id = req.body.responsable._id;
        caja.responsable.usuario = req.body.responsable.usuario;
        caja.responsable.contrasena = req.body.responsable.contrasena;
        caja.responsable.nombre = req.body.responsable.nombre;
        caja.responsable.email = req.body.responsable.email;
        caja.responsable.perfil = req.body.responsable.perfil;            
        caja.estado = req.body.estado;        
        caja.save();
    }
    
    res.status(200).send(JSON.stringify(caja));
})

router.delete('/cajas/:id', auth, async (req, res) => {
    const irow = await Caja.findOneAndRemove({"_id" : req.params.id});
    
    console.log(irow);

    res.status(200).send( {mensaje: 'caja eliminada con éxito!'});
})

//******************* Personas **********************//

router.post('/personas', auth, async (req, res) => {        
    const newPersona = new Persona(
        {   
            tipo_identificacion: req.body.tipo_identificacion,
            identificacion: req.body.identificacion,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion,
            email: req.body.email,
            telefono: req.body.telefono 
        });

    await newPersona.save();

    res.status(200).send(JSON.stringify(newPersona));
})


router.get('/personas', auth, async (req, res) => {
    const persona = await Persona.find();

    res.status(200).send(JSON.stringify(persona));
})

router.get('/personas/:id', auth, async (req, res) => {
    const persona = await Persona.findOne({_id: req.params.id});

    res.status(200).send(JSON.stringify(persona));
})

router.put('/personas/:id', auth, async (req, res) => {
    const persona = await Persona.findOne({_id: req.params.id});
    
    if(persona!=null){
        persona.tipo_identificacion = req.body.tipo_identificacion,
        persona.identificacion = req.body.identificacion,
        persona.nombres = req.body.nombres,
        persona.apellidos = req.body.apellidos,
        persona.direccion = req.body.direccion,
        persona.email = req.body.email,
        persona.telefono = req.body.telefono
        persona.save();
    }
    
    res.status(200).send(JSON.stringify(persona));
})

router.delete('/personas/:id', auth, async (req, res) => {    
    const irow = await Persona.findOneAndRemove({"_id" : req.params.id});    

    res.status(200).send( {mensaje: 'persona eliminada con éxito!'});
})

router.get('/personas/existe_identificacion/:identificacion', auth, async (req, res) => {
    const persona = await Persona.findOne({"identificacion" : req.params.identificacion});

    if(persona != null)
        res.status(200).send(true);
    else
        res.status(200).send(false);
})

//******************* Tipo Movimiento **********************//

router.post('/tipo_movimiento', auth, async (req, res) => {        
    const newTipoMovimiento = new TipoMovimiento(
        {               
            signo: req.body.signo,
            codigo: req.body.codigo,
            nombre: req.body.nombre 
        });

    await newTipoMovimiento.save();

    res.status(200).send(JSON.stringify(newTipoMovimiento));
})


router.get('/tipo_movimiento', auth, async (req, res) => {
    const tipo_movimientos = await TipoMovimiento.find();

    res.status(200).send(JSON.stringify(tipo_movimientos));
})

router.get('/tipo_movimiento/:id', auth, async (req, res) => {
    const tipo_movimiento = await TipoMovimiento.findOne({_id: req.params.id});

    res.status(200).send(JSON.stringify(tipo_movimiento));
})

router.get('/tipo_movimiento/signo/:id', auth, async (req, res) => {
    const tipo_movimiento = await TipoMovimiento.find({'signo': req.params.id});

    res.status(200).send(JSON.stringify(tipo_movimiento));
})

router.put('/tipo_movimiento/:id', auth, async (req, res) => {
    const tipo_movimiento = await TipoMovimiento.findOne({_id: req.params.id});
    
    if(tipo_movimiento!=null){
        tipo_movimiento.signo = req.body.signo,
        tipo_movimiento.codigo = req.body.codigo,
        tipo_movimiento.nombre = req.body.nombre,
        tipo_movimiento.save();
    }
    
    res.status(200).send(JSON.stringify(tipo_movimiento));
})

router.delete('/tipo_movimiento/:id', auth, async (req, res) => {
    const irow = await TipoMovimiento.findOneAndRemove({"_id" : req.params.id});

    res.status(200).send( {mensaje: 'tipo movimiento eliminada con éxito!'});
})

//******************* Movimiento Caja **********************//

router.post('/movimiento_caja', auth, async (req, res) => {        
    
    const newMovimientoCaja = new MovimientoCaja(
        {               
            fecha: req.body.fecha, 
            iglesia: {
              _id: req.body.iglesia._id,
              nombre: req.body.iglesia.nombre,
              codigo: req.body.iglesia.codigo,
              direccion: req.body.iglesia.direccion,
              codigo_postal: req.body.iglesia.codigo_postal,
              fecha_creacion: req.body.iglesia.fecha_creacion,
              pastor: req.body.iglesia.pastor,
              email: req.body.iglesia.email,
              telefono: req.body.iglesia.telefono,
              whatsapp: req.body.iglesia.whatsapp,
              website: req.body.iglesia.website,
              facebook: req.body.iglesia.facebook 
            },
            caja: {
                iglesia: {
                    _id: req.body.caja.iglesia._id,
                    nombre: req.body.caja.iglesia.nombre,
                    codigo: req.body.caja.iglesia.codigo,
                    direccion: req.body.caja.iglesia.direccion,
                    codigo_postal: req.body.caja.iglesia.codigo_postal,
                    fecha_creacion: req.body.caja.iglesia.fecha_creacion,
                    pastor: req.body.caja.iglesia.pastor,
                    email: req.body.caja.iglesia.email,
                    telefono: req.body.caja.iglesia.telefono,
                    whatsapp: req.body.caja.iglesia.whatsapp,
                    website: req.body.caja.iglesia.website,
                    facebook: req.body.caja.iglesia.facebook
                  },
                  responsable: {
                    _id: req.body.caja.responsable._id,
                    usuario: req.body.caja.responsable.usuario,
                    contrasena: req.body.caja.responsable.contrasena,
                    nombre: req.body.caja.responsable.nombre,
                    email: req.body.caja.responsable.email,
                    perfil: req.body.caja.responsable.perfil 
                  },
                  codigo: req.body.caja.codigo,
                  nombre: req.body.caja.nombre,
                  moneda: req.body.caja.moneda,
                  estado: req.body.caja.estado
            },
            signo: req.body.signo,
            tipo_movimiento: { 
                _id: req.body.tipo_movimiento._id,
                signo: req.body.tipo_movimiento.signo,
                nombre: req.body.tipo_movimiento.nombre
            },
            referencia: req.body.referencia,            
            valor: req.body.valor
        });

    if(req.body.persona != undefined){
        const _persona = {
            _id: req.body.persona._id,
            tipo_identificacion: req.body.persona.tipo_identificacion,
            identificacion: req.body.persona.identificacion,
            nombres: req.body.persona.nombres,
            apellidos: req.body.persona.apellidos,
            direccion: req.body.persona.direccion,
            email: req.body.persona.email,
            telefono: req.body.persona.telefono
        };

        newMovimientoCaja.persona = _persona;    
    }    

    await newMovimientoCaja.save();

    res.status(200).send(JSON.stringify(newMovimientoCaja));
})


router.get('/movimiento_caja', auth, async (req, res) => {
    const movimiento_caja = await MovimientoCaja.find();

    res.status(200).send(JSON.stringify(movimiento_caja));
})

router.get('/movimiento_caja/:id', auth, async (req, res) => {
    const movimiento_caja = await MovimientoCaja.findOne({_id: req.params.id});

    res.status(200).send(JSON.stringify(movimiento_caja));
})

router.put('/movimiento_caja/:id', auth, async (req, res) => {
    const movimiento_caja = await MovimientoCaja.findOne({_id: req.params.id});
    
    if(movimiento_caja!=null){
        movimiento_caja.fecha = req.body.fecha, 
        movimiento_caja.iglesia._id = req.body.iglesia._id,
        movimiento_caja.iglesia.nombre = req.body.iglesia.nombre,
        movimiento_caja.iglesia.codigo = req.body.iglesia.codigo,
        movimiento_caja.iglesia.direccion = req.body.iglesia.direccion,
        movimiento_caja.iglesia.codigo_postal = req.body.iglesia.codigo_postal,
        movimiento_caja.iglesia.fecha_creacion = req.body.iglesia.fecha_creacion,
        movimiento_caja.iglesia.pastor = req.body.iglesia.pastor,
        movimiento_caja.iglesia.email = req.body.iglesia.email,
        movimiento_caja.iglesia.telefono = req.body.iglesia.telefono,
        movimiento_caja.iglesia.whatsapp = req.body.iglesia.whatsapp,
        movimiento_caja.iglesia.website = req.body.iglesia.website,
        movimiento_caja.iglesia.facebook = req.body.iglesia.facebook,
        movimiento_caja.caja.iglesia._id = req.body.caja.iglesia._id,
        movimiento_caja.caja.iglesia.nombre = req.body.caja.iglesia.nombre,
        movimiento_caja.caja.iglesia.codigo = req.body.caja.iglesia.codigo,
        movimiento_caja.caja.iglesia.direccion = req.body.caja.iglesia.direccion,
        movimiento_caja.caja.iglesia.codigo_postal = req.body.caja.iglesia.codigo_postal,
        movimiento_caja.caja.iglesia.fecha_creacion = req.body.caja.iglesia.fecha_creacion,
        movimiento_caja.caja.iglesia.pastor = req.body.caja.iglesia.pastor,
        movimiento_caja.caja.iglesia.email = req.body.caja.iglesia.email,
        movimiento_caja.caja.iglesia.telefono = req.body.caja.iglesia.telefono,
        movimiento_caja.caja.iglesia.whatsapp = req.body.caja.iglesia.whatsapp,
        movimiento_caja.caja.iglesia.website = req.body.caja.iglesia.website,
        movimiento_caja.caja.iglesia.facebook = req.body.caja.iglesia.facebook
        movimiento_caja.caja.responsable._id = req.body.caja.responsable._id,
        movimiento_caja.caja.responsable.usuario = req.body.caja.responsable.usuario,
        movimiento_caja.caja.responsable.contrasena = req.body.caja.responsable.contrasena,
        movimiento_caja.caja.responsable.nombre = req.body.caja.responsable.nombre,
        movimiento_caja.caja.responsable.email = req.body.caja.responsable.email,
        movimiento_caja.caja.responsable.perfil = req.body.caja.responsable.perfil,
        movimiento_caja.caja.codigo = req.body.caja.codigo,
        movimiento_caja.caja.nombre = req.body.caja.nombre,
        movimiento_caja.caja.moneda = req.body.caja.moneda,
        movimiento_caja.caja.estado = req.body.caja.estado,
        movimiento_caja.signo = req.body.signo,
        movimiento_caja.tipo_movimiento._id = req.body.tipo_movimiento._id,
        movimiento_caja.tipo_movimiento.signo = req.body.tipo_movimiento.signo,
        movimiento_caja.tipo_movimiento.nombre = req.body.tipo_movimiento.nombre,
        movimiento_caja.referencia = req.body.referencia,
        movimiento_caja.persona._id = req.body.persona._id,
        movimiento_caja.persona.tipo_identificacion = req.body.persona.tipo_identificacion,
        movimiento_caja.persona.identificacion = req.body.persona.identificacion,
        movimiento_caja.persona.nombres = req.body.persona.nombres,
        movimiento_caja.persona.apellidos = req.body.persona.apellidos,
        movimiento_caja.persona.direccion = req.body.persona.direccion,
        movimiento_caja.persona.email = req.body.persona.email,
        movimiento_caja.persona.telefono = req.body.persona.telefono,
        movimiento_caja.valor = req.body.valor,
        movimiento_caja.save();
    }
    
    res.status(200).send(JSON.stringify(movimiento_caja));
})

router.delete('/movimiento_caja/:id', auth, async (req, res) => {
    const irow = await MovimientoCaja.findOneAndRemove({"_id" : req.params.id});

    res.status(200).send( {mensaje: 'movimiento de caja eliminada con éxito!'});
})

module.exports = router;