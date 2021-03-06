import express from 'express'
import isntAuthenticated from '../../middlewares/is-not-authenticated'
import User from '../../models/user'

const router = express.Router()

router.get('/', [ isntAuthenticated ], (req, res, next) => {
  User.findByIdAndRemove(req.user.id, (error, info) => {
    if (error) {
      next(error)
    }

    req.logout()
    return res.redirect('/')
  })
})

export default router
