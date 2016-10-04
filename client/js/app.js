import $ from 'jquery'
import * as notificate from './notifications'
import { api } from './api'
import { initToggles } from './toggles'

api('results', (error, results) => {
  $('#loading').addClass('dn')

  if (error) {
    return notificate.error(error.message)
  }

  // $('#nacional-primera-meaning').html(results.nacional.laPrimera.meaning)
  $('#nacional-primera-number').html(results.nacional.laPrimera.number)

  // $('#nacional-matutina-meaning').html(results.nacional.matutina.meaning)
  $('#nacional-matutina-number').html(results.nacional.matutina.number)

  // $('#nacional-vespertina-meaning').html(results.nacional.vespertina.meaning)
  $('#nacional-vespertina-number').html(results.nacional.vespertina.number)

  // $('#nacional-nocturna-meaning').html(results.nacional.nocturna.meaning)
  $('#nacional-nocturna-number').html(results.nacional.nocturna.number)

  // $('#provincia-primera-meaning').html(results.provincia.laPrimera.meaning)
  $('#provincia-primera-number').html(results.provincia.laPrimera.number)

  // $('#provincia-matutina-meaning').html(results.provincia.matutina.meaning)
  $('#provincia-matutina-number').html(results.provincia.matutina.number)

  // $('#provincia-vespertina-meaning').html(results.provincia.vespertina.meaning)
  $('#provincia-vespertina-number').html(results.provincia.vespertina.number)

  // $('#provincia-nocturna-meaning').html(results.provincia.nocturna.meaning)
  $('#provincia-nocturna-number').html(results.provincia.nocturna.number)

  $('#results').removeClass('dn')
})

initToggles('#toggles')
