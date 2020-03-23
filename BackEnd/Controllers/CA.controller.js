const CuerpoAcademico = require('../Models/CA.model');

module.exports.postCuerpoAcademico = async (req, res) => {
    try {
        const resp2 = await CuerpoAcademico.findOne({clave: req.body.clave}, function(err, CA){
            if(CA)
                return res.json({ok: false, message: 'Ya existe este cuerpo academico'});
        });
        var clave = req.body.clave;
        var anio = req.body.anio_creacion;
        var duracion = req.body.duracion;
        var nivel = req.body.nivel;
        var nombre = req.body.nombre;
        var objCA = new CuerpoAcademico({clave: clave, anio_creacion: anio, duracion: duracion, nivel: nivel, nombre: nombre});
        const resp = await objCA.save(function (err, CA){
            if(err) 
                return res.json({ok: false, err, message: 'Error al guardar'});
            res.json({ok: true, objCA});
        });
    } catch (error) {
        res.json({ok: false, error});
    }
}

module.exports.putCuerpoAcademico = async (req, res) => {
    try {
        var query = {clave: req.params.id};
        var clave = req.body.clave;
        var anio = req.body.anio_creacion;
        var duracion = req.body.duracion;
        var nivel = req.body.nivel;
        var nombre = req.body.nombre;
        const resp = await CuerpoAcademico.findOneAndUpdate(query, {clave: clave, anio_creacion: anio, duracion: duracion, nivel: nivel, nombre: nombre}, function(err, CA){
            if(err)
                return res.json({ok: false, err, message: 'Error al actualizar'});
            if(!CA)
                return res.json({ok: false, message: 'No se encontro el documento'});
            res.json({ok: true, CA});
        });
        
    } catch (error) {
        res.json({ok: false, error});
    }
}


module.exports.getCuerposAcademicos = async (req, res) => {
    try {
        //Populate indica que se llenara los datos de integrantes con la referencia del trabajador
        const resp = await CuerpoAcademico.find();//.populate('integrantes.integrante');
        res.json({ok: true, resp});
    } catch (error) {
        res.json({ok: false, error});
    }
}

module.exports.getCuerpoAcademico = async (req, res) => {
    try {
        //Populate indica que se llenara los datos de integrantes con la referencia del trabajador
        var codigo = req.params.id;
        const resp = await CuerpoAcademico.findOne({clave: codigo});//.populate('integrantes.integrante');
        res.json({ok: true, resp});
    } catch (error) {
        res.json({ok: false, error});
    }
}