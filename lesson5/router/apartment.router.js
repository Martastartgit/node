const router = require('express').Router();

const apartmentMiddleware = require('../middleware/apartment.middleware');
const apartmentController = require('../controller/apartment.controller');
const residentMiddleware = require('../middleware/resident.middelware');

router.route('/')
    .get(apartmentController.findAllApartment)
    .post(apartmentMiddleware.isApartmentValid, apartmentController.createApartment);
router.route('/:apartmentId')
    .get(residentMiddleware.isIdValid, apartmentController.findSingleApartment)
    .put(residentMiddleware.isIdValid, apartmentController.updateApartmentById)
    .delete(residentMiddleware.isIdValid, apartmentMiddleware.isApartmentValid, apartmentController.deleteApartmentById);

module.exports = router;
