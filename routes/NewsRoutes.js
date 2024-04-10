
const express = require('express')
const router = express.Router()

const {
    getOnenemail, 
    getallnemail, 
    generalUpdate, 
    createNewsletterEmail, 
    deleteOnenemail 
} = require('../controllers/newletter')


router.post('/create', createNewsletterEmail)
router.post('/getallemails', getallnemail)
router.post('/getoneemail', getOnenemail)
router.post('/deleteoneemail', deleteOnenemail)
router.post('/general/update', generalUpdate )

module.exports = router
