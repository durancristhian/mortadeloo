import express from 'express'
import { getResults } from '../lib/get-results'

const router = express.Router()

router.get('/results', (req, res) => {
  getResults(req.query.date, (error, results) => {
    if (error) {
      return res.status(500).json(error)
    }

    return res.json(results)
  })
})

export default router
