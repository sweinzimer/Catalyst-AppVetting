/**
 * This is a simple example of how to use an express router.
 * Renders route: /
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Quick link usage examples',
        body: '',
        // this would change it from the default layout, layout.hbs to b3-layout.hbs
        // res.locals.layout = 'b3-layout';
    });
});

module.exports = router;
