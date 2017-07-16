import fs from 'fs'
import path from 'path'

const resultsPath = path.join('server', 'resources', 'results-from-2006-01-01-to-2017-07-16.json')
const resultsJSON = fs.readFileSync(resultsPath, 'utf8')
const results = JSON.parse(resultsJSON)

const draws = [
  'nacional',
  'provincia'
]
const plays = [
  'laPrimera',
  'matutina',
  'vespertina',
  'nocturna'
]

const appearences = results.reduce((prev, curr) => {
  const getNumber = function (playName, playTime) {
    const parsedNumber = parseInt(curr.results[playName][playTime].number, 10)
    return isNaN(parsedNumber) ? -1 : parsedNumber
  }
  draws.forEach(draw => {
    plays.forEach(play => {
      const number = getNumber(draw, play)

      if (number !== -1) {
        if (prev[draw][number]) {
          prev[draw][number] = prev[draw][number] + 1
        } else {
          prev[draw][number] = 1
        }
      }
    })
  })

  return prev
}, {
  nacional: {},
  provincia: {}
})

console.log(JSON.stringify(appearences, null, 2))
