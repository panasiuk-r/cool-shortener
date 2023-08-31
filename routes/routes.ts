import express, { Request, Response } from 'express'

import { addUrl, getUrl } from '../services/urlService'

const app = express()
app.use(express.json())
  
app.get('/shorten', (request: Request, response: Response) => {
	if(request.query.url){
			getUrl(request.query.url.toString()).then(url => {
			 response.redirect(url)
		}).catch(error => {
			console.log('An error occurred:', error.message)
			response.status(500).json({ error: 'An error occurred' })
		})
	}
	else {
  	response.status(400).json({ error: 'URL parameter missing' })
	}
})
  
app.post('/shorten', (request: Request, response: Response) => {
	addUrl(request.body.url || '').then(url => {
 		response.json(url)
	}).catch(error => {
		console.error('An error occurred:', error.message)
		response.status(500).json({ error: 'An error occurred' })
	})
})

export default app
