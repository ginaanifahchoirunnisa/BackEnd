module.exports = (app) =>{

    //call the controller to initialize each function for each router for API's
    const users = require('../controllers/user.controller')
    //call express router ( must and default)
    const router = require('express').Router()

    /* USER ROUTES REQUEST API's */
    router.get('/', users.findAll)
    router.post('/', users.create)
    router.get('/:id', users.getById)
    router.put('/:id', users.editData)
    router.delete('/:id', users.delete)
    router.post('/login', users.loginUser)


    app.use('/api/users', router)
}