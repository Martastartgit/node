const router = require('express').Router();

const residentController = require('../controller/resident.controller');
const residentMiddleware = require('../middleware/resident.middelware');

router.route('/')
    .get(residentController.findAllResident)
    .post(residentMiddleware.isResidentValid, residentController.createResident);
router.route('/:residentId')
    .delete(residentMiddleware.isIdValid, residentController.deleteResidentById)
    .get(residentMiddleware.isIdValid, residentController.getSingleResident)
    .put(residentMiddleware.isIdValid, residentMiddleware.isResidentValid, residentController.updateResidentById);

module.exports = router;
