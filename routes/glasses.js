const express = require('express');

const glassesController = require('../controllers/glasses');

const router = express.Router();

router.get('/', glassesController.getGlasses); //get all the glasses

router.get('/:id', glassesController.getGlassesId); //get one glasses

router.post('/', glassesController.postGlasses);


//router.put('/', glassesController.putGlassesDescription); //MaJ description

router.put('/', glassesController.putGlasses);

router.delete('/:id', glassesController.deleteGlasses);
module.exports = router;

