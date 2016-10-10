import fs from 'fs'
import path from 'path'

const dreamsFile = path.join(__dirname, '../', '../', 'resources', 'dreams.json')
const dreamsJSON = fs.readFileSync(dreamsFile, 'utf8')
const parsedDreams = JSON.parse(dreamsJSON)
const dreams = parsedDreams.dreams

export default function (req, res, next) {
  res.locals.dreams = dreams

  next()
}
