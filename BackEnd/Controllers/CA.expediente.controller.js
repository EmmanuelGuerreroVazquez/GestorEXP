const CuerpoAcademico = require('../Models/CA.model');
const fs = require('fs');

module.exports.postCuerpoAcademicoExp = async (req, res) => {
    try {
        var dir = './Files/uploads/'+req.params.id+'/expediente/';
        var expedienteDigitalizado = req.file.originalname;
        var buffer;
        await fs.mkdir(dir, {recursive: true}, function errDirCreate(err){
            console.log('creando carpeta');
            if(err)
                console.log(err);
        });
        await fs.rename('./Files/uploads/'+expedienteDigitalizado, dir + expedienteDigitalizado, function errMoveFile(err){
                console.log('moviendo el archivo');
                if(err)
                    console.log(err);
                fs.readFile(dir + expedienteDigitalizado, function handleFile(err,data){
                    if(err)
                        console.log(err);
                    else
                        buffer = data;
                });
        });
        await CuerpoAcademico.findOne({clave: req.params.id}, function handleDocument(err, CA){
            console.log('guardando documento');
                if(err) 
                    return res.json({ok: false, err});
                CA.expedienteDigitalizado = buffer;
                CA.save(function saveFile(err, CA2){
                if(err) 
                    return res.json({ok: false, err});
                res.json({ok: true, CA2});
            });
        });
        
    } catch (error) {
        res.json({ok: false, error});
    }
}

module.exports.putCuerpoAcademicoExp = async (req, res) => {
    try {
        var dir = './Files/uploads/'+req.params.id+'/expediente/';
        var expedienteDigitalizado = req.file.originalname;
        var buffer;
        await fs.rename('./Files/uploads/'+expedienteDigitalizado, dir + expedienteDigitalizado, function errMoveFile(err){
                console.log('moviendo el archivo');
                if(err)
                    console.log(err);
                fs.readFile(dir + expedienteDigitalizado, function handleFile(err,data){
                    if(err)
                        console.log(err);
                    else
                        buffer = data;
                });
        });
        await CuerpoAcademico.findOne({clave: req.params.id}, function handleDocument(err, CA){
            console.log('guardando documento');
                if(err) 
                    return res.json({ok: false, err});
                CA.expediente_digitalizado = buffer;
                CA.save(function saveFile(err, CA2){
                if(err) 
                    return res.json({ok: false, err});
                res.json({ok: true, CA2});
            });
        });
        
    } catch (error) {
        res.json({ok: false, error});
    }
}

module.exports.getCuerpoAcademicoExp = async (req, res) => {
    try {
        var codigo = req.params.id;
        var dir = './Files/temp/'+codigo+'.pdf';
        var buffer;
        await CuerpoAcademico.findOne({clave: codigo}, function(err,CA){
            console.log('buscando documento');
            if(err)
            {
                console.log('error de busqueda');
            }

            buffer = CA.expediente_digitalizado;
        });
        await fs.writeFile(dir, buffer, function(err){
            console.log('escribiendo documento');
            if(err)
            {
                console.log('error de escritura');
            }
            res.download(dir, 'Expediente'+codigo+'.pdf', function(err){
                fs.unlink(dir, function(err){
                    if(err)
                        console.log(err);
                    });
            });
        });
        
        
    } catch (error) {
        res.json({ok: false, error});
    }
}