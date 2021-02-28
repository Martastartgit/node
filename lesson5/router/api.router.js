const router = require('express').Router();

const residentRouter = require('./resident.router');
const apartmentRouter = require('./apartment.router');

router.use('/residents', residentRouter);
router.use('/apartments', apartmentRouter);

module.exports = router;
