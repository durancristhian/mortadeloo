// import { initSchedule } from './lib/check-results'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import expressHandlebars from 'express-handlebars'
import expressSession from 'express-session'
import helmet from 'helmet'
import http from 'http'
import mongoose from 'mongoose'
import passport from 'passport'
import path from 'path'
import realtime from './realtime'

if (!process.env.NODE_ENV) {
  dotenv.load({
    path: '.env',
    silent: true
  })
}

const app = express()
const port = process.env.PORT
const server = http.createServer(app)

import * as handlebarsHelpers from './lib/handlebars-helpers'

const handlebars = expressHandlebars.create({
  extname: 'html',
  defaultLayout: 'main',
  helpers: handlebarsHelpers,
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
})

app.engine('html', handlebars.engine)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.use(helmet())
app.use(compression())
app.use(cookieParser())

const session = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})

app.use(session)
app.use(passport.initialize())
app.use(passport.session())

import authentication from './authentication'
authentication()

import dreams from './middlewares/dreams'
app.use(dreams)

app.use(express.static('public'))

import apiController from './api'
import appController from './routes/app'
import goodbyeController from './routes/goodbye'
import homeController from './routes/home'
import logoutController from './routes/logout'
import twitterController from './routes/auth/twitter'

app.use('/', homeController)
app.use('/api', apiController)
app.use('/app', appController)
app.use('/auth/twitter', twitterController)
app.use('/goodbye', goodbyeController)
app.use('/logout', logoutController)

app.use((error, req, res, next) => {
  res.status(500).send({
    error: error.message,
    stack: error.stack
  })
})

mongoose.connect(process.env.DB)

mongoose.connection.on('error', (error) => {
  console.error({
    error: error.message,
    stack: error.stack
  })
  process.exit(1)
})

mongoose.connection.on('connected', () => {
  server.listen(port, () => console.log(`http://localhost:${port}`))
  realtime(server, session)
  // initSchedule()
})
