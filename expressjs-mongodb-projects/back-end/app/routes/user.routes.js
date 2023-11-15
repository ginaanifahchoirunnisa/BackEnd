module.exports = (app) =>{

    const users = require('../controllers/user.controller')
    const router = require('express').Router()

    /* USER ROUTES REQUEST API's */
    router.get('/', users.findAll)
    router.post('/', users.create)
    router.get('/:id', users.getById)


    app.use('/api/users', router)
}