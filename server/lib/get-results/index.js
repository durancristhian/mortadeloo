import cheerio from 'cheerio'
import moment from 'moment'
import request from 'request'

const options = {
  url: 'http://www.dejugadas.com/quinielas/datospizarra.php',
  form: {
    fecha: moment().format('YYYY/MM/DD')
  }
}

export function getResults (callback) {
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

    results.nacional.laPrimera = $('#t_datos tr').first().children().eq(2).text()
    results.nacional.matutina = $('#t_datos tr').first().children().eq(3).text()
    results.nacional.vespertina = $('#t_datos tr').first().children().eq(4).text()
    results.nacional.nocturna = $('#t_datos tr').first().children().eq(5).text()

    results.provincia.laPrimera = $('#t_datos tr').first().next().children().eq(2).text()
    results.provincia.matutina = $('#t_datos tr').first().next().children().eq(3).text()
    results.provincia.vespertina = $('#t_datos tr').first().next().children().eq(4).text()
    results.provincia.nocturna = $('#t_datos tr').first().next().children().eq(5).text()

    return callback(null, results)
  })
}
