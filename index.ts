require('dotenv').config({ path: 'config.env' })

import { sequelize, checkCon } from './db/connection'
import app from './routes/routes'

checkCon()

const PORT = process.env.SERVER_PORT || 3001
sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`app on port ${PORT}`)
	})
})
