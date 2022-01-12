const {Router} = require('express');
const {check} = require('express-validator');

const {addActivity, getRandomActivity} = require('../controllers/activities');

const {validateFields} = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getRandomActivity);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    validateFields
], addActivity);

module.exports = router;