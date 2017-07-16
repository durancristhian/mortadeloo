import async from 'async'
import moment from 'moment'
import quinielaResults from 'quiniela-results'
import schedule from 'node-schedule'
import Twitter from 'twitter'
import User from '../../models/user'

function buildTweetMetadata (users, playType, numberToFind) {
  return users.reduce((tweets, user) => {
    const thereIsCoincidence = user.numbers.indexOf(numberToFind) > -1

    if (thereIsCoincidence) {
      tweets.push(`@${user.profile.username} salió el ${numberToFind} (${playType})`)
    }

    return tweets
  }, [])
}

function collectData (callback) {
  async.parallel([
    function (cb) {
      quinielaResults(moment().format('YYYY-MM-DD'))
        .then(results => cb(null, results))
        .catch(cb)
    },
    function (cb) {
      User
        .find({})
        .select({
          'id': 1,
          'numbers': 1,
          'profile.username': 1
        })
        .exec((error, users) => {
          if (error) {
            return cb(error)
          }

          return cb(null, users)
        })
    }
  ], callback)
}

function formatData (playName, callback) {
  collectData((error, results) => {
    if (error) {
      return callback(error)
    }

    const [ numbers, users ] = results

    const nacionalPlayNumberAsString = numbers.nacional[playName].number.toString()
    const nacionalPlayNumber = parseInt(nacionalPlayNumberAsString.substring(nacionalPlayNumberAsString.length - 2))
    const nacionalPlayTweets = buildTweetMetadata(users, 'nacional', nacionalPlayNumber)

    const provinciaPlayNumberAsString = numbers.provincia[playName].number.toString()
    const provinciaPlayNumber = parseInt(provinciaPlayNumberAsString.substring(provinciaPlayNumberAsString.length - 2))
    const provinciaPlayTweets = buildTweetMetadata(users, 'provincia', provinciaPlayNumber)

    const tweetsMetadata = nacionalPlayTweets.concat(provinciaPlayTweets)

    return callback(null, tweetsMetadata)
  })
}

function sendTweets (playName) {
  formatData(playName, (error, tweets) => {
    if (error) {
      return console.error(error)
    }

    const client = new Twitter({
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })

    tweets.forEach((t) => {
      client.post('statuses/update', {
        status: t
      }, (error, data, response) => {
        if (error) {
          return console.error(error)
        }

        console.log(data)
        console.log(response)
      })
    })
  })
}

export function initSchedule () {
  schedule.scheduleJob('0 0 12 * * 1-6', () => sendTweets('laPrimera'))
  schedule.scheduleJob('0 30 14 * * 1-6', () => sendTweets('matutina'))
  schedule.scheduleJob('0 0 18 * * 1-6', () => sendTweets('vespertina'))
  schedule.scheduleJob('0 30 21 * * 1-6', () => sendTweets('nocturna'))
}
