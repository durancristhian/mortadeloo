import express from 'express'
import isntAuthenticated from '../../middlewares/is-not-authenticated'

const router = express.Router()

router.get('/', [ isntAuthenticated ], (req, res) => res.render('app', { user: req.user }))

export default router
