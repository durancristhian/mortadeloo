import dreamsJSON from '../../lib/dreams'

export default function (req, res, next) {
  res.locals.dreams = dreamsJSON

  next()
}
