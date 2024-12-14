const {ensureAuthentication} = require('../Middlewares/ProductValidation')

const router = require('express').Router()

router.get('/', ensureAuthentication, (req, res) => {
    console.log("------ User Info -------\n", req.user)
    res.status(200).json([
        {
            name:"Mobile",
            price: 10000
        },
        {
            name:"TV",
            price: 20000
        }
    ])
})

module.exports = router