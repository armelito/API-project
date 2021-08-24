const express = require('express')
const router = express.Router()
const { post, getAll, get, put, del } = require('../../controllers/categories')

router.get('/', getAll)
router.get('/:id', get)
router.post('/', post)
router.put('/:id', put)
router.delete('/:id', del)

module.exports = router
