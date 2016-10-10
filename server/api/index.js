import express from 'express'
import quinielaResults from 'quiniela-results'

const router = express.Router()

router.get('/results', (req, res) => {
  quinielaResults(req.query.date)
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
})

export default router
