const router = require('express').Router();

const apartmentMiddleware = require('../middleware/apartment.middleware');
const apartmentController = require('../controller/apartment.controller');

router.route('/')
    .get(apartmentController.findAllApartment)
    .post(apartmentMiddleware.isApartmentValid, apartmentController.createApartment);
router.route('/:apartmentId')
    .get(apartmentMiddleware.isIdValid, apartmentController.findSingleApartment)
    .put(apartmentMiddleware.isIdValid, apartmentController.updateApartmentById)
    .delete(apartmentMiddleware.isIdValid, apartmentMiddleware.isApartmentValid, apartmentController.deleteApartmentById);

module.exports = router;
