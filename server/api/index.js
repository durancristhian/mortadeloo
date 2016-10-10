import express from 'express'
import quinielaResults from 'quiniela-results'

const fakeData = false
const router = express.Router()

router.get('/results', (req, res) => {
  quinielaResults(req.query.date)
    .then(results => {
      if (fakeData) {
        res.json({
          'Nacional': {
            'laPrimera': {
              'meaning': 'La pantera',
              'number': '6590'
            },
            'matutina': {
              'meaning': 'La pantera',
              'number': '6590'
            },
            'vespertina': {
              'meaning': 'La pantera',
              'number': '6590'
            },
            'nocturna': {
              'meaning': 'La pantera',
              'number': '6590'
            },
            'rawName': 'Nacional'
          },
          'Provincia': {
            'laPrimera': {
              'meaning': 'La pantera',
              'number': '6590'
            },
            'matutina': {
              'meaning': 'La pantera',
              'number': '6590'
            },
            'vespertina': {
              'meaning': 'La pantera',
              'number': '6590'
            },
            'nocturna': {
              'meaning': 'La pantera',
              'number': '6590'
            },
            'rawName': 'Provincia'
          }})
      } else {
        res.json(results)
      }
    })
    .catch(error => res.status(500).json(error))
})

export default router
