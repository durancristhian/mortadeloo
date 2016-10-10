import express from 'express'
import isAuthenticated from '../../middlewares/is-authenticated'

const router = express.Router()

router.get('/', [ isAuthenticated ], (req, res) => res.render('home-v2'))

export default router
