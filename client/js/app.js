import $ from 'jquery'
import * as notificate from './notifications'
import { api } from './api'
import { initToggles } from './toggles'

api('results', (error, results) => {
  setTimeout(() => {
    $('#loading').addClass('dn')

    if (error) {
      return notificate.error(error.message)
    }

    const invalidResultNacional = isNaN(results.Nacional.laPrimera.number)
    const invalidResultProvincia = isNaN(results.Provincia.laPrimera.number)

    if (invalidResultNacional || invalidResultProvincia) {
      $('#no-results').removeClass('dn')
    } else {
      $('#nacional-primera-meaning').html(results.Nacional.laPrimera.meaning)
      $('#nacional-primera-number').html(results.Nacional.laPrimera.number)

      $('#nacional-matutina-meaning').html(results.Nacional.matutina.meaning)
      $('#nacional-matutina-number').html(results.Nacional.matutina.number)

      $('#nacional-vespertina-meaning').html(results.Nacional.vespertina.meaning)
      $('#nacional-vespertina-number').html(results.Nacional.vespertina.number)

      $('#nacional-nocturna-meaning').html(results.Nacional.nocturna.meaning)
      $('#nacional-nocturna-number').html(results.Nacional.nocturna.number)

      $('#provincia-primera-meaning').html(results.Provincia.laPrimera.meaning)
      $('#provincia-primera-number').html(results.Provincia.laPrimera.number)

      $('#provincia-matutina-meaning').html(results.Provincia.matutina.meaning)
      $('#provincia-matutina-number').html(results.Provincia.matutina.number)

      $('#provincia-vespertina-meaning').html(results.Provincia.vespertina.meaning)
      $('#provincia-vespertina-number').html(results.Provincia.vespertina.number)

      $('#provincia-nocturna-meaning').html(results.Provincia.nocturna.meaning)
      $('#provincia-nocturna-number').html(results.Provincia.nocturna.number)

      $('#results').removeClass('dn')
    }
  }, 3000)
})

initToggles('#toggles')
