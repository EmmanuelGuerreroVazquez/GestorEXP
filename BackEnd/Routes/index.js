const express = require('express');
const router = express.Router();
//const oauth = require('../middleware/credentials');

router.use('/subir_exp', require('./subir_exp'));
router.use('/descargar_exp', require('./descargar_exp'));
router.use('/ver_exp', require('./ver_exp'));
router.use('/actualizar_exp', require('./subir_exp'));
router.use('/subir_CA', require('./subir_CA'));
router.use('/descargar_CA', require('./descargar_CA'));
router.use('/mostrar_CA', require('./mostrar_CA'));
router.use('/actualizar_CA', require('./actualizar_CA'));
router.use('/agregar_integrante_CA', require('./agregar_integrante_CA'));
router.use('/actualizar_integrante_CA', require('./actualizar_integrante_CA'));
router.use('/notificar_vigencia_CA', require('./notificar_vigencia_CA'));
router.use('/notificar_vigencia_Prodep', require('./notificar_vigencia_Prodep'));