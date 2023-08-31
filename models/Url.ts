import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../db/connection'

interface UrlAttributes {
  shortUrl: string
  originalUrl: string
}

const Url = sequelize.define<Model<UrlAttributes>>('Url', {
  shortUrl: {
    type: DataTypes.STRING,
		primaryKey: true,
    unique: true,
  }, 
	originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

export { Url, UrlAttributes }
