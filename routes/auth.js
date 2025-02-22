/*
  Rutas de Usuarios / Auth 
  host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

router.post('/new',
  [ //middlewares
    check('name', 'El nombre es necesario').not().isEmpty(),
    check('email', 'El email es necesario').isEmail(),
    check('password', 'La contraseña debe de tener al menos 6 digitos').isLength({ min: 6 }),
    validarCampos
  ]
  ,crearUsuario);

router.post('/',
  [
    check('email', 'El email no es correcto').isEmail(),
    check('password', 'La contraseña no es correcta').isLength({ min: 6 }),
    validarCampos
  ] 
  ,loginUsuario);

router.get('/renew', validarJWT ,revalidarToken );


module.exports = router;