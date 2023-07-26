const express = require('express');
const router = express.Router()
const contactController = require('../controllers/contactController')

router.get('/contact/view', contactController.view)
router.post('/contact/add', contactController.add)
router.patch('/contact/update', contactController.update)
router.delete('/contact/delete', contactController.delete)

module.exports = router;