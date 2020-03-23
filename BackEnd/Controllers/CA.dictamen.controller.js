const CuerpoAcademico = require('../Models/CA.model');
const fs = require('fs');

module.exports.postCuerpoAcademicoDic = async (req, res) => {
    try {
        var dir = './Files/uploads/' + req.params.id+'/dictamenes/';
        var dictamenDigitalizado = req.file.originalname;
        await fs.mkdir(dir, {recursive: true}, function errDirCreate(err){
            console.log('creando carpeta');
            if(err)
                console.log(err);
        });
        await fs.rename('./Files/uploads/'+dictamenDigitalizado, dir + dictamenDigitalizado, function errMoveFile(err){
                console.log('moviendo el archivo');
                if(err)
                    console.log(err);
                fs.readFile(dir + dictamenDigitalizado, function handleFile(err,data){
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
                CA.dictamen_digitalizado = buffer;
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

module.exports.putCuerpoAcademicoDic = async (req, res) => {
    try {
        var dir = './Files/uploads/' + req.params.id+'/dictamenes/';
        var dictamenDigitalizado = req.file.originalname;
        await fs.rename('./Files/uploads/'+dictamenDigitalizado, dir + dictamenDigitalizado, function errMoveFile(err){
                console.log('moviendo el archivo');
                if(err)
                    console.log(err);
                fs.readFile(dir + dictamenDigitalizado, function handleFile(err,data){
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
                CA.dictamen_digitalizado = buffer;
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

module.exports.getCuerpoAcademicoDic = async (req, res) => {
    try {
        var codigo = req.params.id;
        var dir = './Files/temp/'+codigo+'.pdf';
        await CuerpoAcademico.findOne({clave: codigo}, function(err,CA){
            console.log('buscando documento');
            if(err)
            {
                console.log('error de busqueda');
            }

            buffer = CA.dictamen_digitalizado;
        });
        await fs.writeFile(dir, buffer, function(err){
            console.log('escribiendo documento');
            if(err)
            {
                console.log('error de escritura');
            }
            res.download(dir, 'Dictamen'+codigo+'.pdf', function(err){
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