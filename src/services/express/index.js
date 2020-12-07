import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'
import path from 'path'
export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }
  app.use('/docs',express.static('docs'));
  app.use(express.static('frontend/build'));
  app.get('/docs', function (req, res) {
    res.sendFile('/docs/index.html')
  })
  app.get('/', function (req, res) {
    res.sendFile('index.html')
  })
  app.get('/department', async function (req, res) {
    const departments = await fetch('https://kelompok-sdm-rest-server.herokuapp.com/api/divisi').then(res => res.json())

    //console.log(departments)
    res.json(departments)
  })
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
