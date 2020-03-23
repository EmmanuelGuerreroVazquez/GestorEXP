const CuerpoAcademico = require('../Models/CA.model');

module.exports.postCuerpoAcademicoIntegrante = async (req, res) => {
    try {
        //Esta variable solo se utiliza para probar el schema, se debe realizar una query a trabajadores para obtener el objeto del trabajador a agregar
        var integrante = {integrante: req.body.codigo, tipo: req.body.tipo};
        await CuerpoAcademico.findOne({clave: req.params.id}, function(err, CA){
            if(err) 
                return res.json({ok: false, err});
            CA.integrantes.push(integrante);
            CA.save(function (err, CA){
                if(err) 
                    return res.json({ok: false, err});
                res.json({ok: true, CA});
            });
        });
    } catch (error) {
        res.json({ok: false, error});
    }
}

module.exports.deleteCuerpoAcademicoIntegrante = async (req, res) => {
    try {
        var idIntegrante = req.params.codigo;
        await CuerpoAcademico.findOne({clave: req.params.id}, function(err, CA){
            if(err) 
                return res.json({ok: false, err});
            CA.integrantes.remove(idIntegrante);
            CA.save(function (err, CA){
                if(err) 
                    return res.json({ok: false, err});
                res.json({ok: true, CA});
            });
            
        });
        
    } catch (error) {
        res.json({ok: false, error});
    }
}