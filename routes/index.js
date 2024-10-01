const router = require('express').Router();

//router.get('/' , (req, res) => { res.send('Hello World');});
const passport = require('passport');
router.use('/employees', require('./employees'));
router.use('/department', require('./departments'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/login', passport.authenticate('github'),(req,res) => {});
router.get('/logout', function(req,res,next){
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect('/')
    })
});

router

module.exports = router;
