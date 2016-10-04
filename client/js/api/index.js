import $ from 'jquery'
import moment from 'moment'

export function api (resource, callback) {
  $.ajax({
    data: {
      date: moment().format('YYYY/MM/DD')
    },
    dataType: 'json',
    error: error => callback(error),
    success: results => callback(null, results),
    url: `/api/${resource}`
  })
}
