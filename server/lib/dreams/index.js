import path from 'path'
import fs from 'fs'

const dreamsFile = path.join('server', 'resources', 'dreams.json')
const dreams = fs.readFileSync(dreamsFile, 'utf8')
const dreamsJSON = JSON.parse(dreams)

export default dreamsJSON
