// imports dependencies
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

// local file dependencies
import router from './routes.js'

const app = express()

// middlewares
app.use(cors())
app.use(express.json({ type: 'application/json' }))
app.use(morgan('dev'))
app.use(helmet({ contentSecurityPolicy: false }))

// serve the static pages
app.use(express.static('../public/dist'))

// different routes
app.use('/services', router)

// listen
app.listen(process.env.PORT, () => {
	console.log('Server is running on ', process.env.PORT)
})