import cheerio from 'cheerio'
// import dreamsJSON from '../dreams'
import moment from 'moment'
import request from 'request'

function getResultObject (numberAsString) {
  // let meaning = '----'
  let number = numberAsString

  // return { meaning, number }
  return { number }
}

export function getResults (date, callback) {
  const options = {
    form: {
      fecha: moment(date, 'YYYY/MM/DD').format('YYYY/MM/DD')
    },
    url: 'http://www.dejugadas.com/quinielas/datospizarra.php'
  }

  request.post(options, (error, response, body) => {
    if (error) {
      console.error(error)
      return callback(error)
    }

    let $ = cheerio.load(body, {
      normalizeWhitespace: true
    })
    let results = {
      code: 1,
      nacional: {},
      provincia: {}
    }

    const nationalRow = $('#t_datos tr').first().children()
    const provintialRow = $('#t_datos tr').first().next().children()

    results.nacional.laPrimera = getResultObject(nationalRow.eq(2).text())
    results.nacional.matutina = getResultObject(nationalRow.eq(3).text())
    results.nacional.vespertina = getResultObject(nationalRow.eq(4).text())
    results.nacional.nocturna = getResultObject(nationalRow.eq(5).text())

    results.provincia.laPrimera = getResultObject(provintialRow.eq(2).text())
    results.provincia.matutina = getResultObject(provintialRow.eq(3).text())
    results.provincia.vespertina = getResultObject(provintialRow.eq(4).text())
    results.provincia.nocturna = getResultObject(provintialRow.eq(5).text())

    return callback(null, results)
  })
}
