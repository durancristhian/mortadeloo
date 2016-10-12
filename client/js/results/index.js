import $ from 'jquery'
import * as notificate from '../notifications'
import { api } from '../api'

export function showResults () {
  api('results', (error, results) => {
    if (error) {
      return notificate.error(error.message)
    }

    let originalPlayResultsTemplate = $('#play-results-template')
    let $resultsTable = $('#results-table')

    for (const property in results) {
      if (results.hasOwnProperty(property)) {
        const play = results[property]
        let template = originalPlayResultsTemplate
          .clone()
          .prop('id', property)
          .removeClass('dn')

        template.find('.js-play-name').html(play.rawName)

        if (!isNaN(parseInt(play.laPrimera.number))) {
          template.find('.js-laPrimera-number').html(play.laPrimera.number)
          template.find('.js-laPrimera-meaning').html(play.laPrimera.meaning)
        } else {
          template.find('.js-laPrimera-box').addClass('o-30')
        }

        if (!isNaN(parseInt(play.matutina.number))) {
          template.find('.js-matutina-number').html(play.matutina.number)
          template.find('.js-matutina-meaning').html(play.matutina.meaning)
        } else {
          template.find('.js-matutina-box').addClass('o-30')
        }

        if (!isNaN(parseInt(play.vespertina.number))) {
          template.find('.js-vespertina-number').html(play.vespertina.number)
          template.find('.js-vespertina-meaning').html(play.vespertina.meaning)
        } else {
          template.find('.js-vespertina-box').addClass('o-30')
        }

        if (!isNaN(parseInt(play.nocturna.number))) {
          template.find('.js-nocturna-number').html(play.nocturna.number)
          template.find('.js-nocturna-meaning').html(play.nocturna.meaning)
        } else {
          template.find('.js-nocturna-box').addClass('o-30')
        }

        $resultsTable.append(template)
      }
    }

    $('#loading').addClass('dn')
    $('#results').removeClass('dn')
  })
}
